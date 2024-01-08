# FWTF_typescript
A bare bones implementation of the Fixed Width Text File Toolkit, in TypeScript. 

Because the best way to learn a new programming language . . . is to destroy any joy you once felt for a passion project. 🙄

I'm not going to rehash the "Why" behind the Fixed Width Text File Toolkit. If you don't need it or like it, *then don't use it & move on*.

Let's say you've got a chunk of fixed width text, like this one below:

```
let testing = 
`DATE        TIME        TYPE           NAME
10/10/2016  05:50 PM    <DIR>          .
10/10/2016  05:50 PM    <DIR>          ..
07/06/2016  08:32 PM    <DIR>          Active-Directory-CFWheels-Plugin
07/06/2016  08:31 PM    <DIR>          AllowUploads
07/06/2016  08:28 PM    <DIR>          Buffer_Button_for_WordPress
07/06/2016  08:24 PM    <DIR>          CFML-RegEx-Tester
10/10/2016  05:51 PM    <DIR>          CommonSpot ADF
11/13/2016  02:35 PM    <DIR>          Fixed-Width-Text-File-Toolkit
07/06/2016  08:22 PM    <DIR>          fizzbuzz
07/06/2016  08:27 PM    <DIR>          google-geocoder
07/06/2016  08:25 PM    <DIR>          PWPolicy
07/06/2016  08:28 PM    <DIR>          reCAPTCHA-Mailhide-API
07/06/2016  08:19 PM    <DIR>          substitution-cipher
07/06/2016  08:23 PM    <DIR>          USAJobs
07/06/2016  08:02 PM    <DIR>          Vigenere-Cipher`
```

I've assigned it as a string literal to a variable, but you could read it from a file, a form field, etc. You know that part of your situation better than I do, ok?

Create an instance of the Fixed Width Text File object, like so:

`let myFWTF = new (fixedWidthTextFile as any)();`

Feed the text into the object:

`myFWTF.setText(testing);`

This splits the text into lines, with the assumption the EOL character is "\n". If that's incorrect, you can override like this:

`myFWTF.setText(testing, '\r\n');`

Define the column(s) you are interested in:

`myFWTF.addColumn("date", 0, 12);  // remember, JS starts counting from 0, so adjust accordingly
myFWTF.addColumn("name", 39, 72);`

I've deliberately left out the time and type columns because I'm not interested in them, but they'd look something like this, obviously:

`// myFWTF.addColumn("time", 12, 24);
// myFWTF.addColumn("type", 24, 39);`

Now that we've defined what we're looking for, let's parse the data.

`myFWTF.parse();`

From here, myFWTF.records should have an array of objects corresponding to the columnar data you wanted. Because it's an array, you can map or filter or whatever you want to do.

If you just want to extract the data into JSON, you can do this:

`JSONResults = JSON.stringify( myFWTF.records );`

