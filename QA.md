# QA Testing

## Round One

-   navigation needs "You Are Here" link underline
-   Weird top border inside the blog author box DONE
-   Spacing above the date in Related Posts section DONE
-   update the date divs to <time> element DONE
-   fix awkward spacing after title on full_width layout DONE
-   need to adjust spacing/flexbox for blog meta comment count, tags and social icons DONE
-   mobile spacing for header needs to be tightened up DONE
-   check the border styles on the category - not specific enough DONE
-   are you reusing the 'full_width' class name by mistake? DONE
-   fix styles for the blog category on masonry page DONE
-   update the page title and descriptions DONE
-   make an svg signature DONE
-   need clamp() for .secondary-heading font-size DONE

## Round Two

-   social icons on blog layout should be centeed, but they are left aligned
-   titles for side latest posts need to be linked
-   need padding after date, before next item on masonry layout
-   full width blog header still looks too tight on mobile - probably just need more margin after hero
-   footer links should be white on hover

## Forms

-   safari select, also ios select
-   investigate form styles on ios
-   make the height of the form textarea taller
-   gap inbetween inputs on form is too big on full_width layout

## Technical Debt

-   consider more CSS refactoring and make a scss partial for typography and headings
-   rethink the CSS structure strategy so layouts aren't tied to really specific types of pages
-   layout styles are templates, not pages like about or contact
