import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";
import { UrlObject } from "url";

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink(
  {children, shouldMatchExactHref = false, ...rest}: ActiveLinkProps
) {
  const { asPath } = useRouter();
  const isActive = linkActive(asPath, shouldMatchExactHref, rest.href, rest.as);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  );
}

function linkActive(
  path: string, 
  shouldMatchExactHref: boolean, 
  currentHref: (string | UrlObject),
  currentAs: (string | UrlObject),
): boolean {
  const haveFullMatch = path === currentHref || path === currentAs;
  const havePartialMatch = path.startsWith(String(currentHref)) || 
    path.startsWith(String(currentAs));

  return shouldMatchExactHref && haveFullMatch ||
    !shouldMatchExactHref && havePartialMatch;
}