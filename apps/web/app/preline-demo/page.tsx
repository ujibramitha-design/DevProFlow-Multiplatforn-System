"use client";

import { useState } from 'react';
import { PrelineDropdown, PrelineAccordion, PrelineTabs, PrelineTooltip } from '@/components/ui/preline-components';
import { Button } from '@/components/ui/button';
import { Settings, User, LogOut, ChevronDown, Info } from 'lucide-react';

export default function PrelineDemoPage() {
  const [activeTab, setActiveTab] = useState(0);

  const accordionItems = [
    {
      title: 'Apa itu Preline UI?',
      content: 'Preline UI adalah koleksi komponen UI yang dibangun dengan Tailwind CSS, menyediakan elemen interaktif seperti dropdown, modal, accordion, dan banyak lagi.'
    },
    {
      title: 'Fitur Utama',
      content: 'Mendukung dark mode, animasi smooth, responsive design, dan mudah dikustomisasi. Semua komponen telah dioptimalkan untuk performa terbaik.'
    },
    {
      title: 'Integrasi dengan Next.js',
      content: 'Komponen-komponen ini telah dibungkus dalam React hooks untuk memudahkan integrasi dengan Next.js 16+ dan TypeScript.'
    }
  ];

  const tabItems = [
    {
      label: 'Overview',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preline UI Integration</h3>
          <p className="text-muted-foreground">
            Preline UI berhasil diinstall dan terintegrasi dengan project Next.js Anda. 
            Semua komponen dapat digunakan dengan import yang sederhana.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">✅ Installed</h4>
              <p className="text-sm text-muted-foreground">Package berhasil diinstall via npm</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">✅ Components Ready</h4>
              <p className="text-sm text-muted-foreground">Dropdown, Accordion, Tabs, Tooltip</p>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Components',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Components</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              PrelineDropdown - Dropdown menu dengan berbagai placement
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              PrelineAccordion - Expandable/collapsible content
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              PrelineTabs - Tab navigation system
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              PrelineTooltip - Hover tooltips
            </li>
          </ul>
        </div>
      )
    },
    {
      label: 'Usage',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">How to Use</h3>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm">
{`import { PrelineDropdown } from '@/components/ui/preline-components';

<PrelineDropdown trigger={<Button>Menu</Button>}>
  <div className="py-2">
    <a href="#" className="block px-4 py-2 hover:bg-muted">Item 1</a>
    <a href="#" className="block px-4 py-2 hover:bg-muted">Item 2</a>
  </div>
</PrelineDropdown>`}
            </pre>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Preline UI Demo</h1>
        <p className="text-muted-foreground">
          Demonstrasi komponen Preline UI yang terintegrasi dengan project Anda
        </p>
      </div>

      {/* Dropdown Demo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dropdown Component</h2>
        <div className="flex gap-4">
          <PrelineDropdown
            trigger={
              <Button variant="outline" className="flex items-center gap-2">
                User Menu <ChevronDown className="w-4 h-4" />
              </Button>
            }
            placement="bottom-left"
          >
            <div className="py-1">
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
                <User className="w-4 h-4" />
                Profile
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
                <Settings className="w-4 h-4" />
                Settings
              </a>
              <hr className="my-1" />
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-destructive">
                <LogOut className="w-4 h-4" />
                Logout
              </a>
            </div>
          </PrelineDropdown>

          <PrelineTooltip content="This is a tooltip!">
            <Button variant="outline" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Hover me
            </Button>
          </PrelineTooltip>
        </div>
      </div>

      {/* Accordion Demo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Accordion Component</h2>
        <PrelineAccordion items={accordionItems} />
      </div>

      {/* Tabs Demo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tabs Component</h2>
        <PrelineTabs items={tabItems} />
      </div>

      {/* Integration Status */}
      <div className="bg-muted/50 border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🎉 Integration Status: SUCCESS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Package installed via npm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Components wrapped for React</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">TypeScript support</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Client-side initialization</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Build successful</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Dark mode compatible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
