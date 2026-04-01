using Microsoft.UI.Xaml;

namespace DesktopWinUI
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
{
    this.InitializeComponent();
    
    // Aktifkan efek Mica (Transparan Khas Windows 11)
    this.SystemBackdrop = new Microsoft.UI.Xaml.Media.MicaBackdrop();
    
    // Menghilangkan Title Bar standar agar desain v0 Mas bisa naik ke atas
    this.ExtendsContentIntoTitleBar = true;
    this.SetTitleBar(null); // Membuat area atas bisa di-drag
}

private async void InitWebView()
{
    await MainWebView.EnsureCoreWebView2Async();
    MainWebView.CoreWebView2.WebMessageReceived += (s, e) =>
    {
        string message = e.TryGetWebMessageAsString();
        if (message == "CLOSE_APP") Application.Current.Exit();
    };
}