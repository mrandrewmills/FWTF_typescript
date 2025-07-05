# FWTF_typescript (Fixed Width Text File / Typescript)
A bare bones implementation of the Fixed Width Text File Toolkit, in TypeScript. 

I'm not going to rehash the "Why" behind the Fixed Width Text File Toolkit. If you don't need and/or like it, *then don't use it & move along*.

Suppose you've got a chunk of fixed width text, like this:

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

I've assigned it as a string literal to a variable, but you could read it from a file, a form field, etc. 

After transpiling fixedWidthParser.ts into JavaScript and adding it into your project, you first feed the text into the object:

`fixedWidthParser.setText(testing);`

This splits the text into lines, and leaves it up to the script to "auto-detect" the kind of line-breaks (i.e. CR, LF, or CR/LF) 

If the "auto-detect" results are incorrect, you can override like this:

`fixedWidthParser.setText(testing, '\r\n');`

Next, define the column(s) you are interested in:

```
fixedWidthParser.addColumn("date", 0, 11);  // remember, JS starts counting from 0, so adjust accordingly
fixedWidthParser.addColumn("name", 39, 72);
```

I've left out the time and type columns because I'm not interested in them, but they'd look something like this:

```
fixedWidthParser.addColumn("time", 12, 23);
fixedWidthParser.addColumn("type", 24, 38);
```

Once we've defined what we're looking for, we can parse the data.

`fixedWidthParser.parse();`

From here, *fixedWidthParser.records* should have an array of objects corresponding to the columnar data you wanted. Since this is an array, you can map, filter, or whatever array functions you wish.

If you just want to extract the data into JSON, you can do this:

`JSONResults = JSON.stringify( fixedWidthParser.records );`

## NOTES / THINGS TO BEAR IN MIND:

If you parse() and get only a single record, check your EOL-- it's probably not what you think it is (e.g. \r\n instead of \n, or vice versa).

Invoking the parse() method does *NOT* pre-emptively clear the .records array at this time; it appends the new records to the ones you previously parsed. The logic behind this choice is "I can parse a series of log files with the same columns in rapid succession and combine the data with just .setText() and .parse()" . . . so there might be cases where you want to fixedWidthParser.records = [] to "reset" before you parse a new file.
