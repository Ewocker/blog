---
layout: post
title: Storybook
description: Example usage for writing
image:
  src: hero.jpeg
  alt: Hero
  width: 750
  height: 536
keywords:
  - storybook
head:
  meta:
    - name: author
      content: 小貓貓工程師
    - name: read
      content: 0 min read
    - property: article:published_time
      content: 2023-11-31T00:00:00.000Z
    - property: article:modified_time
      content: 2023-11-31T00:00:00.000Z
---

## Headers

# h1

## h2

### h3

------

## Emphasis

Emphasis, aka italics, with *asterisks* or *underscores*.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and *underscores***.

Strikethrough uses two tildes. ~~Scratch this.~~

**This is bold text**

**This is bold text**

*This is italic text*

*This is italic text*

~~Strikethrough~~

------

## Lists

1. First ordered list item
2. Another item
   * Unordered sub-list.
3. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
4. And another item.

---

1. Make my changes
    1. Fix bug
    2. Improve formatting
        * Make the headings bigger
2. Push my commits to GitHub
3. Open a pull request
    * Describe my changes
    * Mention all the members of my team
        * Ask for feedback

* Create a list by starting a line with `+`, `-`, or `*`
* Sub-lists are made by indenting 2 spaces:
  * Marker character change forces new list start:
    * Ac tristique libero volutpat at
    * Facilisis in pretium nisl aliquet
    * Nulla volutpat aliquam velit
* Very easy!

------

## Task lists

* [x] Finish my changes
* [ ] Push my commits to GitHub
* [ ] Open a pull request
* [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
* [x] list syntax required (any unordered or ordered list supported)
* [ ] this is a complete item
* [ ] this is an incomplete item

------

## Ignoring Markdown formatting

You can tell GitHub to ignore (or escape) Markdown formatting by using \ before the Markdown character.

Let's rename \*our-new-project\* to \*our-old-project\*.

------

## Links

[I'm an inline-style link](https://www.google.com)

------

## Images

Here's our logo (hover to see the title text):

Inline-style:
![alt text](hero.jpeg)

**!!!** You don't need to specify the full path when writing blog post, as long as the asset is in the same folder path
Ex. On post with path `/blog/test/test1` using `![alt text](hero.jpeg)` will find image at path `public/blog/test/test1/hero.jpeg`

------

## Code and Syntax Highlighting

```
Inline `code` has `back-ticks around` it.
```

Inline `code` has `back-ticks around` it.

```c#
using System.IO.Compression;

#pragma warning disable 414, 3021

namespace MyApplication
{
    [Obsolete("...")]
    class Program : IInterface
    {
        public static List<int> JustDoIt(int count)
        {
            Console.WriteLine($"Hello {Name}!");
            return new List<int>(new int[] { 1, 2, 3 })
        }
    }
}
```

------

## Tables

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Command | Description |
| --- | --- |
| git status | List all new or modified files |
| git diff | Show file differences that haven't been staged |

| Command | Description |
| --- | --- |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |

| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |

| Name     | Character |
| ---      | ---       |
| Backtick | `         |
| Pipe     | \|        |

------

## Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

------

## Inline HTML

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

------

## Horizontal Rules

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

------

## Custom Component

See [Tailwind](https://flowbite.com/docs/typography/text/#text-decoration-style) for decoration classes.

### Note

::note
The note component is a better version of markdown quote
::

::note{class="text-lg"}
large text
::

::note{class="text-red-800"}
red text
::

::note-img
![alt](/common/siliconvalleykittycatengineer.jpeg)
some text describing the image!
::

### Epilogue

::epilogue
如果你有那麼一些好奇平凡的我是如何走到這的<br/>
又或是這個小創業未來將會如何發展～<br/>
讓我和你娓娓道來<br/>
我的第一個創業現在進行式
::

### Footnote

::footnote-block
\[11\] S-Lab, Sustainability Lab. 永續性發展工作室，一個專門給校內項目提供協助的協會。  
\[12\] Mission Street，Santa Cruz 是美國一號高速公路上會經過的城鎮，其中Mission Street 就是一號高速公路在經過Santa Cruz時地圖上顯示的名字。  
\[13\] Taqueria Vallarta，Taqueria 指的是專賣墨西哥捲餅的快餐店，Vallarta大概是店名的一部分。
::

### Section

::section{class="text-md border-zinc-800 text-center font-bold"}
*一二三四五六七八九十，section is a way for providing classes to a block of element.*
::

### Asciinema

::asciinema{id="389003"}
::

### Emoji

To use or search for Emoji, press `cmd + ctrl + space`

😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹