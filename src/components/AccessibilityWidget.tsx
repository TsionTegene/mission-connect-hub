
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  AccessibilityIcon,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Type,
  X,
} from "lucide-react";

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState("default");

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const changeFontSize = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const changeContrast = (newContrast: string) => {
    setContrast(newContrast);
    
    // Remove existing contrast classes
    document.body.classList.remove(
      "high-contrast",
      "night-mode",
      "sepia-mode"
    );
    
    // Add new contrast class if not default
    if (newContrast !== "default") {
      document.body.classList.add(newContrast);
    }
  };

  const resetAll = () => {
    setFontSize(100);
    setContrast("default");
    document.documentElement.style.fontSize = "100%";
    document.body.classList.remove(
      "high-contrast",
      "night-mode",
      "sepia-mode"
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleWidget}
        size="icon"
        aria-label="Accessibility Options"
        className="rounded-full shadow-lg bg-primary h-12 w-12"
      >
        <AccessibilityIcon className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-background border rounded-lg shadow-lg p-4 w-72">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Accessibility Options</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleWidget}
              aria-label="Close accessibility panel"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="font-size" className="text-sm font-medium">
                  Text Size
                </label>
                <div className="flex items-center">
                  <ZoomOut className="h-3 w-3 mr-2" />
                  <span className="text-xs">{fontSize}%</span>
                  <ZoomIn className="h-3 w-3 ml-2" />
                </div>
              </div>
              <Slider
                id="font-size"
                defaultValue={[100]}
                min={80}
                max={200}
                step={10}
                value={[fontSize]}
                onValueChange={changeFontSize}
                aria-label="Adjust text size"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contrast</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant={contrast === "default" ? "default" : "outline"}
                  onClick={() => changeContrast("default")}
                  className="text-xs"
                >
                  <Sun className="h-3 w-3 mr-2" />
                  Default
                </Button>
                <Button
                  size="sm"
                  variant={contrast === "high-contrast" ? "default" : "outline"}
                  onClick={() => changeContrast("high-contrast")}
                  className="text-xs"
                >
                  <Type className="h-3 w-3 mr-2" />
                  High Contrast
                </Button>
                <Button
                  size="sm"
                  variant={contrast === "night-mode" ? "default" : "outline"}
                  onClick={() => changeContrast("night-mode")}
                  className="text-xs"
                >
                  <Moon className="h-3 w-3 mr-2" />
                  Dark Mode
                </Button>
                <Button
                  size="sm"
                  variant={contrast === "sepia-mode" ? "default" : "outline"}
                  onClick={() => changeContrast("sepia-mode")}
                  className="text-xs"
                >
                  <Type className="h-3 w-3 mr-2" />
                  Sepia Mode
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={resetAll}
              className="w-full"
            >
              Reset to Default
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;
