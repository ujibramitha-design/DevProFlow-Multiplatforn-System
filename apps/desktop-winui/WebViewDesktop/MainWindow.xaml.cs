using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Win32;
using System.Runtime.InteropServices;

namespace WebViewDesktop;

/// <summary>
/// Interaction logic for MainWindow.xaml
/// </summary>
public partial class MainWindow : Window
{
    [DllImport("dwmapi.dll", PreserveSig = false)]
    internal static extern bool DwmSetWindowAttribute(IntPtr hwnd, DwmWindowAttribute attr, ref int attrValue, int attrSize);

    internal enum DwmWindowAttribute : int
    {
        DWMWA_USE_IMMERSIVE_DARK_MODE = 20,
        DWMWA_MICA_EFFECT = 1029
    }

    public MainWindow()
    {
        InitializeComponent();
        
        // Detect dan sinkronkan tema Windows
        SetupThemeDetection();
        
        // Setup WebView source
        MainWebView.Source = new Uri("http://localhost:3000");
        
        // Apply current theme
        ApplyWindowsTheme();
    }

    private void SetupThemeDetection()
    {
        // Listen untuk system theme changes
        SystemEvents.UserPreferenceChanged += OnUserPreferenceChanged;
    }

    private void OnUserPreferenceChanged(object sender, UserPreferenceChangedEventArgs e)
    {
        if (e.Category == UserPreferenceCategory.General)
        {
            Dispatcher.Invoke(() =>
            {
                ApplyWindowsTheme();
                // Notify WebView tentang theme change
                NotifyWebViewThemeChange();
            });
        }
    }

    private void ApplyWindowsTheme()
    {
        bool isDarkMode = IsSystemDarkMode();
        
        // Apply dark mode ke window chrome
        var hwnd = new System.Windows.Interop.WindowInteropHelper(this).Handle;
        if (hwnd != IntPtr.Zero)
        {
            int attributeValue = isDarkMode ? 1 : 0;
            DwmSetWindowAttribute(hwnd, DwmWindowAttribute.DWMWA_USE_IMMERSIVE_DARK_MODE, ref attributeValue, sizeof(int));
        }

        // Update background berdasarkan theme
        Background = isDarkMode ? 
            new SolidColorBrush(Color.FromRgb(32, 32, 32)) : 
            new SolidColorBrush(Color.FromRgb(248, 249, 250));
    }

    private bool IsSystemDarkMode()
    {
        try
        {
            using (RegistryKey key = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize"))
            {
                if (key != null)
                {
                    object value = key.GetValue("AppsUseLightTheme");
                    if (value != null && int.TryParse(value.ToString(), out int lightTheme))
                    {
                        return lightTheme == 0; // 0 = Dark, 1 = Light
                    }
                }
            }
        }
        catch
        {
            // Fallback ke system default
            return false;
        }
        return false;
    }

    private void NotifyWebViewThemeChange()
    {
        try
        {
            // Kirim JavaScript ke WebView untuk toggle dark class
            string script = IsSystemDarkMode() ? 
                "document.documentElement.classList.add('dark')" : 
                "document.documentElement.classList.remove('dark')";
            
            if (MainWebView != null && MainWebView.IsLoaded)
            {
                MainWebView.InvokeScript("eval", new[] { script });
            }
        }
        catch
        {
            // WebView belum ready, ignore
        }
    }

    protected override void OnClosed(EventArgs e)
    {
        SystemEvents.UserPreferenceChanged -= OnUserPreferenceChanged;
        base.OnClosed(e);
    }
}