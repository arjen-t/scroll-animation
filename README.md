# simple-animation

Simple Animation (sa) is a HTML interface implementation for Anime.js.
Each element can contain three different animation strategies how to interact with anime.js

## Viewport vs element
Each element will has it's own perspective of the client viewport matrix.
Hereby you can determine for each animation element the viewport size and how the animation interacts with it's "own" viewport.

## Standard strategy
```html
<element data-sa="an animation"></element>
```
The animation will be played when the element enters the viewport.
When the element exit the viewport the animation will be played reverse.
<table>
    <thead>
        <td>Property</th>
        <td>Input</th>
        <td>Description</th>
        <td>Default</th>
    </thead>
    <tbody>
        <tr>
            <td>data-sa-target</td>
            <td>search string</td>
            <td>Search string for children element(s) confirm the find method of JQuery.</td>
            <td>none</td>
        </tr>
        <tr>
            <td>data-timeline</td>
            <td>string</td>
            <td>In combination with data-sa-target you are able to define all targets within a timeline. </td>
            <td>none</td>
        </tr>
        <tr>
            <td>data-sa-repeat</td>
            <td>true/false</td>
            <td>Repeat the animation yes or no.</td>
            <td>true</td>
        </tr>
        <tr>
            <td>data-sa-duration</td>
            <td>number</td>
            <td>Overwrite the default duration of the animation.</td>
            <td>Anime duration setting</td>
        </tr>
        <tr>
            <td>data-vp-trigger</td>
            <td>top/bottom</td>
            <td>Which side is considered as entering the viewport.</td>
            <td>bottom</td>
        </tr>
        <tr>
            <td>data-vp-ofsset-top</td>
            <td>pixel/percentage</td>
            <td>How much "padding" the viewport has on the top.</td>
            <td>0</td>
        </tr>
        <tr>
            <td>data-vp-ofsset-bottom</td>
            <td>pixel/percentage</td>
            <td>How much "padding" the viewport has on the bottom.</td>
            <td>0</td>
        </tr>
    </tbody>
</table>

## Scroll strategy
```html
<element data-sa-scroll="an animation"></element>
```
When scrolling into the viewport the element position within the viewport determine the position of the animation.
When scrolling out the viewport the animation will be played reverse based on the element position within the viewport.

<table>
    <thead>
        <td>Property</th>
        <td>Input</th>
        <td>Description</th>
        <td>Default</th>
    </thead>
    <tbody>
        <tr>
            <td>data-sa-target</td>
            <td>search string</td>
            <td>Search string for children element(s). Search is done by the JQuery find method.</td>
            <td>none</td>
        </tr>
        <tr>
            <td>data-timeline</td>
            <td>string</td>
            <td>In combination with data-sa-target you are able to define all targets within a timeline. </td>
            <td>none</td>
        </tr>
        <tr>
            <td>data-sa-duration</td>
            <td>number</td>
            <td>Overwrite the default duration of the animation.</td>
            <td>Anime duration setting</td>
        </tr>
        <tr>
            <td>data-scroll-trigger</td>
            <td>top/bottom</td>
            <td>Which side is considered as entering the viewport.</td>
            <td>bottom</td>
        </tr>
        <tr>
            <td>data-scroll-speed</td>
            <td>number</td>
            <td>Increase or decrease the animation duration speed based on the element scroll position in it's own viewport.</td>
            <td>0</td>
        </tr>
        <tr>
            <td>data-vp-ofsset-top</td>
            <td>pixel/percentage</td>
            <td>How much "padding" the viewport has on the top.</td>
            <td>0</td>
        </tr>
        <tr>
            <td>data-vp-ofsset-bottom</td>
            <td>pixel/percentage</td>
            <td>How much "padding" the viewport has on the bottom.</td>
            <td>0</td>
        </tr>
    </tbody>
</table>

## Anchor strategy
```html
<element data-sa-anchor="an animation"></element>
```

When scrolling down and the element bottom pass by the anchor element the animation will be played. 
By scrolling up and the element bottom passes by the anchor element the animation will be played reverse.

<table>
    <thead>
        <td>Property</th>
        <td>Input</th>
        <td>Description</th>
        <td>Default</th>
    </thead>
    <tbody>
        <tr>
            <td>data-anchor-target</td>
            <td>search string</td>
            <td>Search string for the anchor element. Search is done by the JQuery find method.</td>
            <td>none</td>
        </tr>
        <tr>
            <td>data-sa-duration</td>
            <td>number</td>
            <td>Overwrite the default duration of the animation.</td>
            <td>Anime duration setting</td>
        </tr>
    </tbody>
</table>

## How to initialise Simple Animation?
```javascript
$(document).ready(function () {
    $("[data-sa],[data-sa-scroll],[data-sa-anchor]").simpleAnimation();
});
``` 

## How to add your own Anime.js settings?

```javascript
SimpleAnimation.addAnimation("fadeIn", {
    opacity: [0, 1],
    easing: 'linear',
    duration: 1500
}).addAnimation("fadeOut", {
    opacity: [1, 0],
    easing: 'linear',
    duration: 1500
 });
```

## Dependency
JQuery