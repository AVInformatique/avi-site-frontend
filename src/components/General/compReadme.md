# How to use Components

# How to use

- Add them like normal components
- To specific their properties, using attributes.
- For example, to have a large yellow button

```jsx
<ButtonComp
    divClassName="button-inside"
    color='yellow'
    size='large'
    text="Learn more"
    stateParrent = {state}
/>
```

# Some components

Xem cách sdung properties ở dưới

- ButtonComp (size, color, text, divClassName, stateParent): button with text inside  (e sẽ add thêm callback vào sau =)))
- ButtonIcon (color, icon, divClassName, callback): square button with only icon inside
- DropDown (listItems, callback, size, text, divClassName)
- SearchBarMedium: under construction

# Properties

- Some properties can be used:
    - `divClassName`: if you set className in components, sometime, you can not use that className to css, so divClassName will permet use to do that. (in other word, divClassName will be real className add to className of the component)
    - `color`: just ‘yellow’ or ‘red’ for some components at the moment
    - `size` : ’small’ or ‘medium’ or ‘large’
    - `text`: text inside button
    - `icon`: only for button Icon, use by add React Icon inside. ex: icon = {<IoMdSearch />}
    - `callback`: add callback here, to make components do the callback when their action is activated (like click on button or chose an option in dropdown)
    - `stateParent`: add parent state (”defalut”,”hover”, “press”) here to make the component have the same state at their parent.