import React from "react";

type TypographyProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'muted';
  text?: string;
};

const typographyStyles = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  muted: "text-sm text-muted-foreground",
};

export const Typography = ({ type, text }: TypographyProps) => {
  const Component = type === 'muted' ? 'p' : type

  return React.createElement(
    Component,
    { className: typographyStyles[type] },
    text
  );
};