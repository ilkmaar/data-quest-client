Getting started

Upgrade guide
Upgrading your Tailwind CSS projects from v3 to v4.

Tailwind CSS v4.0 is a new major version of the framework, so while we've worked really hard to minimize breaking changes, some updates are necessary. This guide outlines all the steps required to upgrade your projects from v3 to v4.

To simplify the process, we’ve developed a migration tool that can automatically handle the bulk of these changes for you in typical projects.

Using the upgrade tool
If you'd like to try upgrading a project from v3 to v4, you can use our upgrade tool to do the vast majority of the heavy lifting for you:

Terminal
$ npx @tailwindcss/upgrade@next
For most projects, the upgrade tool will automate the entire migration process including updating your dependencies, migrating your configuration file to CSS, and handling any changes to your template files.

The upgrade tool requires Node.js 20 or higher, so ensure your environment is updated before running it.

We recommend running the upgrade tool in a new branch, then carefully reviewing the diff and testing your project in the browser to make sure all of the changes look correct. You may need to tweak a few things by hand in complex projects, but the tool will save you a ton of time either way.

It's also a good idea to go over all of the breaking changes in v4 and get a good understanding of what's changed, in case there are other things you need to update in your project that the upgrade tool doesn't catch.

Upgrading manually
Using PostCSS
In v3, the tailwindcss package was a PostCSS plugin, but in v4 the PostCSS plugin lives in a dedicated @tailwindcss/postcss package.

Additionally, in v4 imports and vendor prefixing is now handled for you automatically, so you can remove postcss-import and autoprefixer if they are in your project:

postcss.config.mjs
export default {
plugins: {
"postcss-import": {},
tailwindcss: {},
autoprefixer: {},
"@tailwindcss/postcss": {},
},
};
Using Vite
If you're using Vite, we recommend migrating from the PostCSS plugin to our new dedicated Vite plugin for improved performance and the best developer experience:

vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
plugins: [
tailwindcss(),
],
});
Using Tailwind CLI
In v4, Tailwind CLI lives in a dedicated @tailwindcss/cli package. Update any of your build commands to use the new package instead:

Terminal
npx tailwindcss -i input.css -o output.css
npx @tailwindcss/cli -i input.css -o output.css
Changes from v3
Here's a comprehensive list of all the breaking changes in Tailwind CSS v4.0.

Our upgrade tool will handle most of these changes for you automatically, so we highly recommend using it if you can.

Removed @tailwind directives
In v4 you import Tailwind using a regular CSS @import statement, not using the @tailwind directives you used in v3:

CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "tailwindcss";
Removed deprecated utilities
We've removed any utilities that were deprecated in v3 and have been undocumented for several years. Here's a list of what's been removed along with the modern alternative:

Deprecated Replacement
bg-opacity-_ Use opacity modifiers like bg-black/50
text-opacity-_ Use opacity modifiers like text-black/50
border-opacity-_ Use opacity modifiers like border-black/50
divide-opacity-_ Use opacity modifiers like divide-black/50
ring-opacity-_ Use opacity modifiers like ring-black/50
placeholder-opacity-_ Use opacity modifiers like placeholder-black/50
flex-shrink-_ shrink-_
flex-grow-_ grow-_
overflow-ellipsis text-ellipsis
decoration-slice box-decoration-slice
decoration-clone box-decoration-clone
Renamed utilities
We've renamed the following utilities in v4 to make them more consistent and predictable:

v3 v4
shadow-sm shadow-xs
shadow shadow-sm
drop-shadow-sm drop-shadow-xs
drop-shadow drop-shadow-sm
blur-sm blur-xs
blur blur-sm
rounded-sm rounded-xs
rounded rounded-sm
outline-none outline-hidden
ring ring-3
Updated shadow, radius, and blur scales
We've renamed the default shadow, radius and blur scales to make sure every utility has a named value. The "bare" versions still work for backward compatibility, but the <utility>-sm utilities will look different unless updated to their respective <utility>-xs versions.

To update your project for these changes, replace all the v3 utilities with their v4 versions:

HTML
<input class="shadow-sm" />
<input class="shadow-xs" />
<input class="shadow" />
<input class="shadow-sm" />
Renamed outline utility
The outline-none utility previously didn't actually set outline-style: none, and instead set an invisible outline that would still show up in forced colors mode for accessibility reasons.

To make this more clear we've renamed this utility to outline-hidden and added a new outline-none utility that actually sets outline-style: none.

To update your project for this change, replace any usage of outline-none with outline-hidden:

HTML
<input class="focus:outline-none" />
<input class="focus:outline-hidden" />
Default ring width change
In v3, the ring utility added a 3px ring. We've changed this in v4 to be 1px to make it consistent with borders and outlines.

To update your project for this change, replace any usage of ring with ring-3:

HTML
<input class="ring ring-blue-500" />
<input class="ring-3 ring-blue-500" />
Container configuration
In v3, the container utility had several configuration options like center and padding that no longer exist in v4.

To customize the container utility in v4, extend it using the @utility directive:

CSS
@utility container {
margin-inline: auto;
padding-inline: 2rem;
}
Preflight changes
We've made a couple small changes to the base styles in Preflight in v4:

New default border color
In v3, borders used your configured gray-200 color by default. We've updated this in v4 to be just currentColor, which matches the default behavior of all browsers.

To update your project for this change, make sure you're using a border color utility anywhere you're using the border utility, or add these lines of CSS to your project to preserve the v3 behavior:

CSS
@layer base {
\*,
::after,
::before,
::backdrop,
::file-selector-button {
border-color: var(--color-gray-200, currentColor);
}
}
New default placeholder color
In v3, placeholder text used your configured gray-400 color by default. We've simplified this in v4 to just use the current text color at 50% opacity.

You probably won't even notice this change (it might even make your project look better), but if you want to preserve the v3 behavior, add this CSS to your project:

CSS
@layer base {
input::placeholder,
textarea::placeholder {
color: theme(--color-gray-400);
}
}
Adding custom utilities
In v3, any custom classes you defined within @layer utilities would get picked up by Tailwind as a true utility class and would automatically work with variants like hover, focus, or lg.

In v4 we are using native cascade layers and no longer hijacking the @layer at-rule, so we've introduced the @utility API as a replacement:

CSS
@layer utilities {
.tab-4 {
tab-size: 4;
}
}
@utility tab-4 {
tab-size: 4;
}
Learn more about registering custom utilities in the adding custom utilities documentation.

Variant stacking order
In v3, stacked variants were applied from right to left, but in v4 we've updated them to apply left to right to look more like CSS syntax.

To update your project for this change, reverse the order of any order-sensitive stacked variants in your project:

HTML

<ul class="py-4 first:*:pt-0 last:*:pb-0">
<ul class="py-4 *:first:pt-0 *:last:pb-0">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
You likely have very few of these if any—the direct child variant (*) and any typography plugin variants (prose-headings) are the most likely ones you might be using, and even then it's only if you've stacked them with other variants.

Variables in arbitrary values
In v3 you were able to use CSS variables as arbitrary values without var(), but recent updates to CSS mean that this can often be ambiguous, so we've changed the syntax for this in v4 to use parentheses instead of square brackets.

To update your project for this change, replace usage of the old variable shorthand syntax with the new variable shorthand syntax:

HTML

<div class="bg-[--brand-color]"></div>
<div class="bg-(--brand-color)"></div>
Hover styles on mobile
In v4 we've updated the hover variant to only apply when the primary input device supports hover:

CSS
@media (hover: hover) {
.hover\:underline:hover {
text-decoration: underline;
}
}
This can create problems if you've built your site in a way that depends on touch devices triggering hover on tap. If this is an issue for you, you can override the hover variant with your own variant that uses the old implementation:

CSS
@custom-variant hover (&:hover);
Generally though we recommend treating hover functionality as an enhancement, and not depending on it for your site to work since touch devices don't truly have the ability to hover.

Disabling core plugins
In v3 there was a corePlugins option you could use to completely disable certain utilities in the framework. This is no longer supported in v4.

Using the theme() function
Since v4 includes CSS variables for all of your theme values, we recommend using those variables instead of the theme() function whenever possible:

CSS
.my-class {
background-color: theme(colors.red.500);
background-color: var(--color-red-500);
}
For cases where you still need to use the theme() function (like in media queries where CSS variables aren't supported), you should use the CSS variable name instead of the old dot notation:

CSS
@media (width >= theme(screens.xl)) {
@media (width >= theme(--breakpoint-xl)) {
/_ ... _/
}
Using a JavaScript config file
JavaScript config files are still supported for backward compatibility, but they are no longer detected automatically in v4.

If you still need to use a JavaScript config file, you can load it explicitly using the @config directive:

CSS
@config "../../tailwind.config.js";
Theme values in JavaScript
In v3 we exported a resolveConfig function that you could use to turn your JavaScript-based config into a flat object that you could use in your other JavaScript.

We've removed this in v4 in hopes that people can use the CSS variables we generate directly instead, which is much simpler and will significantly reduce your bundle size.

For example, the popular Motion library for React lets you animate to and from CSS variable values:

JSX
<motion.div animate={{ backgroundColor: "var(--color-blue-500)" }} />
If you need access to a resolved CSS variable value in JS, you can use getComputedStyle to get the value of a theme variable on the document root:

spaghetti.js
let styles = getComputedStyle(document.documentElement);
let shadow = styles.getPropertyValue("--shadow-xl");
