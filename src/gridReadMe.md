# How to use Grid.css

# Idea

Device the screen into 12 columns, and each components will occupe a specific number of columns. This can be done by add words in class name of these components. For example:

```html
<div class = “ className col l-5 m-3 c-12” /></div>
```

The div element above, will occupe 5 columns when screen is large (l-5), occupe 3 columns when screen is medium like tablet (m-3) and will occupe all 12 columns when in mobile (c-12)

To easy to css and working, this grid will fix absolutely their width depend on the screen size (like screen normal → grid width = 1200px, tablet → grid width = 984px, …). The recognization of screen size will be call breakpoints.

# How to use

- Firstly, we will create a container that have grid in their className. The word “wide” make the grid recognize some more breakpoints, but not really necessary

```html
<div class = “ className grid wide” /></div>
```

- Secondly, we will add a row in the parent div above

```html
<div class = “ className grid” />
		<div class = “ className row” />
		</div>
</div>
```

- Thirdly, we add columns inside these rows, remember that it has to have “col” in their class and the size of columns they occupe (like l-5, m-6, c -8)

```html
<div class = “ className grid” />
		<div class = “ className row” />
				<div class = “ className col l-5 m-8 c-12” />
				</div>
		</div>
</div>
```

- And now, you can put your item inside this column, that will have the size of the number of columns specific. (why don’t we use directly this col div but have to make item inside this div, because when we use background color, we will see it’s out of the column, cause background color also color the padding part)

# Some type of columns

- `l-number`: this tell the div to occupe the “number” number of columns when in pc screen
- `m-number`: this tell the div to occupe the “number” number of columns when in tablet screen
- `c-number`: this tell the div to occupe the “number” number of columns when in mobile screen
- Similarly, we have some offset columns (ex: `l-o-5, m-o-2`), it’s like a nothing columns. Like you want to have 12 columns: first 3 columns is dropdown, last 5 columns is searchbar, nothing in 4 columns in the middle, so you can do

```html
<div class = “ dropDown col l-3” /></div>
<div class = “ col l-o-4” /></div>
<div class = “ Searchbar col l-5” /></div>
```

- The normal size of gutter (size between each column) is 24px, this maybe some case too large for you, so instead of “row” in className, change to “row no-gutters” or “row sm-gutter”