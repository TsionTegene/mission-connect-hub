
export type ContentBlock = {
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

// Mock content blocks data
const mockContentBlocks: ContentBlock[] = [
  {
    id: "1",
    page_id: "home",
    section_id: "hero",
    title: "Welcome to Our Church",
    content: "Join us for worship and community.",
    image_url: "/placeholder.svg",
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    page_id: "about",
    section_id: "mission",
    title: "Our Mission",
    content: "To spread love and compassion in our community.",
    image_url: null,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const fetchContent = async (pageId: string, sectionId: string): Promise<ContentBlock | null> => {
  // Mock implementation returning content based on pageId and sectionId
  const content = mockContentBlocks.find(
    block => block.page_id === pageId && block.section_id === sectionId
  );
  
  return Promise.resolve(content || null);
};

export const fetchPageContent = async (pageId: string): Promise<ContentBlock[]> => {
  // Mock implementation returning all content for a page
  const content = mockContentBlocks.filter(block => block.page_id === pageId);
  return Promise.resolve(content);
};
