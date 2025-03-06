[![Tests](https://github.com/oklar/3tp/actions/workflows/test.yml/badge.svg)](https://github.com/oklar/3tp/actions/workflows/test.yml)

# 3 Tags Problem

3TP is a lightweight JavaScript library that extends HTML's native `<form>`, `<button>` and `<a>` capabilities by introducing `<x-form>`, `<x-button>` and `<x-a>` as web components. These components allow support for `PUT`, `PATCH`, and `DELETE` methods, enable standalone buttons & anchors to perform AJAX actions, and support content replacement without breaking browser compatibility.

## Features

- Use `PUT`, `PATCH`, and `DELETE` methods in forms.
- Allow standalone `<x-button>` elements to send requests without wrapping them in a form.
- Enable `<x-form>`, `<x-button>` and `<x-a>` to update DOM elements dynamically.
- No dependencies.

## Installation

Simply include the script in your project:

```html
<script src="3tp.js"></script>
```

# Usage

## Extended <x-form>

Works like a regular form but supports additional HTTP methods and dynamic content updates.

```html
<x-form action="/item" method="PUT" target="content">
  <input type="text" name="item" />
  <x-button type="submit">Update</x-button>
</x-form>
```

## Standalone button and anchor tags

Performs an AJAX request without requiring a form.

```html
<x-button action="/item" method="DELETE" target="content"> Delete </x-button>
```

```html
<x-a action="/item" method="PATCH" target="content"> Patch </x-a>
```

## Dynamic Content Replacement

All tags can update parts of the page dynamically using the target attribute.

```html
<div id="content"></div>

<x-button action="/load-content" method="GET" target="content">
  Load Content
</x-button>
```

# Licence

```
Zero-Clause BSD
=============

Permission to use, copy, modify, and/or distribute this software for
any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL
WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLEs
FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN
AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT
OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

# Inspired from

[htmx](https://github.com/bigskysoftware/htmx), [htmz](https://github.com/Kalabasa/htmz) and the [triptych](https://github.com/alexpetros/triptych) [proposals](https://alexanderpetros.com/triptych/).
