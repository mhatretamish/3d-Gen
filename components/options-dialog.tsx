"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OptionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  options: {
    condition_mode: "concat" | "fuse"
    quality: "high" | "medium" | "low" | "extra-low"
    geometry_file_format: "glb" | "usdz" | "fbx" | "obj" | "stl"
    use_hyper: boolean
    tier: "Regular" | "Sketch"
    TAPose: boolean
    material: "PBR" | "Shaded"
  }
  onOptionsChange: (options: any) => void
}

export default function OptionsDialog({ open, onOpenChange, options, onOptionsChange }: OptionsDialogProps) {
  const [localOptions, setLocalOptions] = useState(options)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Update local options when props change
  useEffect(() => {
    setLocalOptions(options)
  }, [options])

  const handleChange = (key: string, value: any) => {
    setLocalOptions((prev) => {
      const updated = { ...prev, [key]: value }
      onOptionsChange(updated)
      return updated
    })
  }

  const content = (
    <div className="py-2">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-black/50 border border-cyan-900/30">
          <TabsTrigger
            value="basic"
            className="tracking-normal data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
          >
            Basic Settings
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="tracking-normal data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
          >
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-mono tracking-normal">Quality</Label>
              <Select value={localOptions.quality} onValueChange={(value) => handleChange("quality", value)}>
                <SelectTrigger className="bg-black border-cyan-900/30 text-white tracking-normal">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent className="bg-black border-cyan-900/30 text-white">
                  <SelectItem value="high" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    High (50k)
                  </SelectItem>
                  <SelectItem value="medium" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    Medium (18k)
                  </SelectItem>
                  <SelectItem value="low" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    Low (8k)
                  </SelectItem>
                  <SelectItem value="extra-low" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    Extra Low (4k)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-mono tracking-normal">Format</Label>
              <Select
                value={localOptions.geometry_file_format}
                onValueChange={(value) => handleChange("geometry_file_format", value)}
              >
                <SelectTrigger className="bg-black border-cyan-900/30 text-white tracking-normal">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-black border-cyan-900/30 text-white">
                  <SelectItem value="glb" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    GLB
                  </SelectItem>
                  <SelectItem value="usdz" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    USDZ
                  </SelectItem>
                  <SelectItem value="fbx" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    FBX
                  </SelectItem>
                  <SelectItem value="obj" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    OBJ
                  </SelectItem>
                  <SelectItem value="stl" className="tracking-normal hover:bg-cyan-900/20 focus:bg-cyan-900/20">
                    STL
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-cyan-900/30 bg-black/50">
              <div>
                <Label className="text-white font-mono tracking-normal">Use Hyper</Label>
                <p className="text-gray-400 text-xs tracking-normal">Better details</p>
              </div>
              <Switch
                checked={localOptions.use_hyper}
                onCheckedChange={(checked) => handleChange("use_hyper", checked)}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-cyan-900/30 bg-black/50">
              <div>
                <Label className="text-white font-mono tracking-normal">T/A Pose</Label>
                <p className="text-gray-400 text-xs tracking-normal">For humans</p>
              </div>
              <Switch
                checked={localOptions.TAPose}
                onCheckedChange={(checked) => handleChange("TAPose", checked)}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white font-mono tracking-normal">Condition Mode</Label>
            <RadioGroup
              value={localOptions.condition_mode}
              onValueChange={(value) => handleChange("condition_mode", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="concat" id="concat" className="border-cyan-400 text-cyan-400" />
                <Label htmlFor="concat" className="text-white tracking-normal">
                  Concat (Single object, multiple views)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fuse" id="fuse" className="border-cyan-400 text-cyan-400" />
                <Label htmlFor="fuse" className="text-white tracking-normal">
                  Fuse (Multiple objects)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-mono tracking-normal">Material</Label>
            <RadioGroup
              value={localOptions.material}
              onValueChange={(value) => handleChange("material", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PBR" id="pbr" className="border-cyan-400 text-cyan-400" />
                <Label htmlFor="pbr" className="text-white tracking-normal">
                  PBR
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Shaded" id="shaded" className="border-cyan-400 text-cyan-400" />
                <Label htmlFor="shaded" className="text-white tracking-normal">
                  Shaded
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-mono tracking-normal">Generation Tier</Label>
            <RadioGroup
              value={localOptions.tier}
              onValueChange={(value) => handleChange("tier", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Regular" id="regular" className="border-cyan-400 text-cyan-400" />
                <Label htmlFor="regular" className="text-white tracking-normal">
                  Regular (Quality)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sketch" id="sketch" className="border-cyan-400 text-cyan-400" />
                <Label htmlFor="sketch" className="text-white tracking-normal">
                  Sketch (Speed)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-black border-cyan-900/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-cyan-400 font-mono tracking-normal">Options</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-black border-t border-cyan-900/30 text-white">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-xl text-cyan-400 font-mono tracking-normal">Options</DrawerTitle>
          </DrawerHeader>
          <div className="px-4">{content}</div>
          <DrawerFooter>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white tracking-normal"
            >
              Apply Settings
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
