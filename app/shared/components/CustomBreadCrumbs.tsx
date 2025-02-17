import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/shared/components/ui/breadcrumb';
import { cn } from '~/lib/cn';
import { useLocation } from 'react-router';

interface BreadcrumbsPath {
  name: string;
  link: string;
}

interface CustomBreadCrumbs {
  className?: string;
  paths?: BreadcrumbsPath[];
}

export default function CustomBreadCrumbs({
  className,
  paths,
}: CustomBreadCrumbs) {
  const location = useLocation();
  const generateBreadCrumbs = () => {
    const cleanPath = location.pathname.split('?')[0].split('#')[0];

    const pathSegments = cleanPath.split('/').filter(Boolean);

    return pathSegments.map((segment, index) => {
      const link = `/${pathSegments.slice(0, index + 1).join('/')}`;

      const name = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        name,
        link,
      };
    });
  };

  const breadcrumbs = paths || generateBreadCrumbs();

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {breadcrumbs.map(({ name, link }, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink
                href={link}
                className={cn(
                  index === breadcrumbs.length - 1 && 'text-black',
                  'text-base',
                )}
              >
                {name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="px-[10px]" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
