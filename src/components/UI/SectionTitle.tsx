
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({ subtitle, title, centered = true, className }: SectionTitleProps) => {
  return (
    <div className={cn('mb-12 opacity-0 animate-fade-in', centered && 'text-center', className)}>
      {subtitle && (
        <p className="text-highlight-teal font-medium mb-2 uppercase tracking-wider text-sm">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gradient">{title}</h2>
    </div>
  );
};

export default SectionTitle;
