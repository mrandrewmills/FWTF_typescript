interface FixedWidthParser {
    columns: { name: string, start: number, end: number }[];
    lines: string[];
    records: { [key: string]: string }[];
    addColumn(name: string, start: number, end: number): void;
    setText(txt: string, eol?: string): void;
    parse(): void;
}

let fixedWidthParser: FixedWidthParser = {
    columns: [],
    lines: [],
    records: [],

    addColumn(name, start, end) {
        this.columns.push({ name, start, end });
    },

    setText(txt: string, eol?: string) {
        if (!eol) {
            if (txt.includes('\r\n')) {
                eol = '\r\n'; // Windows-style
            } else if (txt.includes('\r')) {
                eol = '\r';   // Classic Mac-style
            } else {
                eol = '\n';   // Unix/Linux-style
            }
        }
        this.lines = txt.split(eol);
    },

    parse() {
        for (let line of this.lines) {
            let record: { [key: string]: string } = {};
            for (let column of this.columns) {
                record[column.name] = line.substring(column.start, column.end).trim();
            }
            this.records.push(record);
        }
    }
};
