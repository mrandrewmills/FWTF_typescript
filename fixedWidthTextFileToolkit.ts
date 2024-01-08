function fixedWidthTextFile(){

    let obj ={

        columns : [] as { name: string, start: number, end: number }[],
        lines: [] as string[],
        records: [] as string[],

        addColumn: function ( name: string, start: number, end: number ){
            obj.columns.push( { "name": name, "start": start, "end": end } )
        },

        setText: function ( txt: string, eol: string = '\n' ){
            obj.lines = txt.split( eol );
        },

        parse: function(){
            for ( let line of obj.lines ){
                let record = {} as string;

                for ( let column of obj.columns ){
                    record[column.name] = line.substring(column.start, column.end).trim();
                }

                obj.records.push(record);
            }
        }
    }

    return obj;
 }
