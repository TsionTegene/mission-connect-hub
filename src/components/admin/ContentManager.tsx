
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type ContentBlock = {
  id: string;
  page_id: string;
  section_id: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
};

const PAGES = [
  { id: "home", name: "Home Page" },
  { id: "about", name: "About Us" },
  { id: "events", name: "Events" },
  { id: "ministries", name: "Ministries" },
  { id: "donate", name: "Donation Page" },
];

const SECTIONS = {
  home: [
    { id: "hero", name: "Hero Section" },
    { id: "mission", name: "Mission Statement" },
    { id: "features", name: "Key Features" },
  ],
  about: [
    { id: "history", name: "Our History" },
    { id: "team", name: "Leadership Team" },
    { id: "vision", name: "Vision & Values" },
  ],
  events: [
    { id: "upcoming", name: "Upcoming Events" },
    { id: "recurring", name: "Recurring Events" },
  ],
  ministries: [
    { id: "youth", name: "Youth Ministry" },
    { id: "worship", name: "Worship Ministry" },
    { id: "community", name: "Community Outreach" },
  ],
  donate: [
    { id: "appeal", name: "Donation Appeal" },
    { id: "impact", name: "Impact Stories" },
  ],
};

const ContentManager = () => {
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [availableSections, setAvailableSections] = useState<{id: string, name: string}[]>([]);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [currentBlock, setCurrentBlock] = useState<Partial<ContentBlock>>({
    title: "",
    content: "",
    image_url: "",
    order_index: 0,
  });

  useEffect(() => {
    // Update available sections when page changes
    setAvailableSections(SECTIONS[selectedPage as keyof typeof SECTIONS] || []);
    setSelectedSection("");
  }, [selectedPage]);

  useEffect(() => {
    if (selectedPage && selectedSection) {
      fetchContentBlock();
    }
  }, [selectedPage, selectedSection]);

  const fetchContentBlock = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("content_blocks")
        .select("*")
        .eq("page_id", selectedPage)
        .eq("section_id", selectedSection);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        setContentBlocks(data);
        setCurrentBlock(data[0]);
      } else {
        // No existing block, create a new one
        setContentBlocks([]);
        setCurrentBlock({
          page_id: selectedPage,
          section_id: selectedSection,
          title: "",
          content: "",
          image_url: "",
          order_index: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching content block:", error);
      toast.error("Failed to load content block");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentBlock((prev) => ({ ...prev, [name]: value }));
  };

  const saveContentBlock = async () => {
    try {
      setSaving(true);
      
      if (!selectedPage || !selectedSection) {
        toast.error("Please select a page and section");
        return;
      }
      
      const blockData = {
        ...currentBlock,
        page_id: selectedPage,
        section_id: selectedSection,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from("content_blocks")
        .upsert(blockData);
        
      if (error) throw error;
      
      toast.success("Content block saved successfully");
      fetchContentBlock();
    } catch (error) {
      console.error("Error saving content block:", error);
      toast.error("Failed to save content block");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">Content Management</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Select Content</CardTitle>
              <CardDescription>
                Choose the page and section you want to edit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Page</label>
                <Select
                  value={selectedPage}
                  onValueChange={(value) => setSelectedPage(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGES.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Section</label>
                <Select
                  value={selectedSection}
                  onValueChange={(value) => setSelectedSection(value)}
                  disabled={!selectedPage || availableSections.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading content...</p>
            </div>
          ) : selectedPage && selectedSection ? (
            <Card className="glass">
              <CardHeader>
                <CardTitle>
                  Edit Content
                </CardTitle>
                <CardDescription>
                  Update content for {PAGES.find(p => p.id === selectedPage)?.name} - 
                  {availableSections.find(s => s.id === selectedSection)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={currentBlock.title || ""}
                    onChange={handleInputChange}
                    placeholder="Enter section title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    name="content"
                    value={currentBlock.content || ""}
                    onChange={handleInputChange}
                    placeholder="Enter section content"
                    rows={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="image_url" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={currentBlock.image_url || ""}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="order_index" className="text-sm font-medium">
                    Display Order
                  </label>
                  <Input
                    id="order_index"
                    name="order_index"
                    type="number"
                    value={currentBlock.order_index || 0}
                    onChange={handleInputChange}
                    min={0}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveContentBlock} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-64 flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">
                Select a page and section to edit content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
