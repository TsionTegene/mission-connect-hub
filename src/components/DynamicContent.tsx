
import { useState, useEffect } from "react";
import { fetchContent, ContentBlock } from "@/utils/content";

type DynamicContentProps = {
  pageId: string;
  sectionId: string;
  fallbackTitle?: string;
  fallbackContent?: string;
  fallbackImage?: string;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
};

const DynamicContent = ({
  pageId,
  sectionId,
  fallbackTitle,
  fallbackContent,
  fallbackImage,
  className = "",
  imageClassName = "",
  titleClassName = "",
  contentClassName = "",
}: DynamicContentProps) => {
  const [content, setContent] = useState<ContentBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchContent(pageId, sectionId);
      setContent(data);
      setLoading(false);
    };
    
    loadContent();
  }, [pageId, sectionId]);

  if (loading) {
    // Return minimal loading state that won't shift layout
    return <div className={className}></div>;
  }

  // Determine what to display, using content from CMS or fallback
  const title = content?.title || fallbackTitle;
  const contentText = content?.content || fallbackContent;
  const image = content?.image_url || fallbackImage;

  return (
    <div className={className}>
      {image && (
        <img
          src={image}
          alt={title || ""}
          className={imageClassName}
        />
      )}
      
      {title && (
        <h2 className={titleClassName}>{title}</h2>
      )}
      
      {contentText && (
        <div 
          className={contentClassName}
          dangerouslySetInnerHTML={{ __html: contentText }}
        />
      )}
    </div>
  );
};

export default DynamicContent;
