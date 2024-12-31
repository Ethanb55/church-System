import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

export function BrandingGuide() {
  const brandColors = [
    { name: 'Primary', hex: '#3B82F6' },
    { name: 'Secondary', hex: '#10B981' },
    { name: 'Accent', hex: '#8B5CF6' },
    { name: 'Background', hex: '#F3F4F6' },
    { name: 'Text', hex: '#1F2937' },
  ]

  const brandFonts = [
    { name: 'Heading', family: 'Inter' },
    { name: 'Body', family: 'Roboto' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding Guide</CardTitle>
        <CardDescription>Our church's visual identity elements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Logos</h3>
          <div className="flex space-x-4">
            <Image src="/logo-dark.svg" alt="Dark Logo" width={100} height={100} />
            <Image src="/logo-light.svg" alt="Light Logo" width={100} height={100} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Colors</h3>
          <div className="grid grid-cols-5 gap-2">
            {brandColors.map((color) => (
              <div key={color.name} className="text-center">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-2" 
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-sm font-medium">{color.name}</p>
                <p className="text-xs text-muted-foreground">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Fonts</h3>
          <div className="grid grid-cols-2 gap-4">
            {brandFonts.map((font) => (
              <div key={font.name} className="text-center">
                <p className="text-2xl mb-2" style={{ fontFamily: font.family }}>{font.name}</p>
                <p className="text-sm text-muted-foreground">{font.family}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

