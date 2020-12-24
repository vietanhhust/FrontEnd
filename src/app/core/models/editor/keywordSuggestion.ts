

// lang: ngôn ngữ cần dùng
// data = Json.parse(respone)
export function register(lang: any, data: any, output1 = [], output2 = []) {
  function suggestGenenrator(range: any, keyword: any, data: any) {
    if (keyword == '') {
      return getAll(data, range);
    } else {
      return getByKeyWord(data, keyword, range);
    }
  }

  // Lấy hết từ khóa
  function getAll(obj: any, range) {
    output1 = [];
    probeTree(obj, range);
    return output1;
  }
  function probeTree(position, range) {
    output1.push({
      label: position.label,
      kind: typeOfElement(position.kind),
      documentation: position.documentation,
      insertText: position.insertText,
      range: range
    });
    if (position.children.length != 0) {
      position.children.forEach(element => {
        probeTree(element, range);
      });
    }
  }

  // Hạn chế từ khóa.
  function getByKeyWord(obj: any, keyword: any, range: any) {
    output2 = [];
    findNode(obj, keyword, range);
    return output2;
  }
  function findNode(position, keyword, range) {
    if (position.label == keyword) {
      // thêm value vào property
      if (position.kind === 'field' || position.kind === 'property') {
        output2.push({
          label: 'value',
          kind: 'enum',
          documentation: 'giá trị cuối',
          insertText: 'value',
          range: range
        });
      }
      if (position.children.length != 0) {
        position.children.forEach(element => {
          output2.push({
            label: element.label,
            kind: typeOfElement(element.kind),
            documentation: element.documentation,
            insertText: element.insertText,
            range: range
          });
        });
      }
    } else {
      if (position.children.length != 0) {
        position.children.forEach(element => {
          findNode(element, keyword, range);
        });
      }
    }
  }

  function typeOfElement(key) {
    switch (key) {
      case 'method': {
        return monaco.languages.CompletionItemKind.Method;
        break;
      }
      case 'field': {
        return monaco.languages.CompletionItemKind.Field;
        break;
      }
      case 'variable': {
        return monaco.languages.CompletionItemKind.Variable;
        break;
      }
      case 'enum': {
        return monaco.languages.CompletionItemKind.Enum;
        break;
      }
      case 'color': {
        return monaco.languages.CompletionItemKind.Color;
        break;
      }
      case 'keyword': {
        return monaco.languages.CompletionItemKind.Keyword;
      }
      case 'snippet': {
        return monaco.languages.CompletionItemKind.Snippet;
      }
      case 'operator': {
        return monaco.languages.CompletionItemKind.Operator;
      }
      case 'property': {
        return monaco.languages.CompletionItemKind.Property;
      }
      case 'class': {
        return monaco.languages.CompletionItemKind.Class;
      }
      case 'struct': {
        return monaco.languages.CompletionItemKind.Struct;
      }
      default: {
        return monaco.languages.CompletionItemKind.Property;
      }
    }

  }

  const lan = monaco.languages.getLanguages().filter(l => l.id === lang)[0];
  if (!lan && lang !== 'json') {
    console.log(lang)
    monaco.languages.register({ id: lang });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider(lang, {
      // Set defaultToken to invalid to see what you do not tokenize yet
      defaultToken: 'invalid',
      tokenPostfix: '.js',

      keywords: [
        'break', 'case', 'catch', 'class', 'continue', 'const',
        'constructor', 'debugger', 'default', 'delete', 'do', 'else',
        'export', 'extends', 'false', 'finally', 'for', 'from', 'function',
        'get', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'null',
        'return', 'set', 'super', 'switch', 'symbol', 'this', 'throw', 'true',
        'try', 'typeof', 'undefined', 'var', 'void', 'while', 'with', 'yield',
        'async', 'await', 'of'
      ],

      typeKeywords: [
        'any', 'boolean', 'number', 'object', 'string', 'undefined'
      ],

      operators: [
        '<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**',
        '*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&',
        '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=',
        '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=',
        '^=', '@',
      ],

      // we include these common regular expressions
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      digits: /\d+(_+\d+)*/,
      octaldigits: /[0-7]+(_+[0-7]+)*/,
      binarydigits: /[0-1]+(_+[0-1]+)*/,
      hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

      regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
      regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

      // The main tokenizer for our languages
      tokenizer: {
        root: [
          [/[{}]/, 'delimiter.bracket'],
          { include: 'common' }
        ],

        common: [
          // identifiers and keywords
          [/[a-z_$][\w$]*/, {
            cases: {
              '@typeKeywords': 'keyword',
              '@keywords': 'keyword',
              '@default': 'identifier'
            }
          }],
          [/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely
          // [/[A-Z][\w\$]*/, 'identifier'],

          // whitespace
          { include: '@whitespace' },

          // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
          [/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/, { token: 'regexp', bracket: '@open', next: '@regexp' }],

          // delimiters and operators
          [/[()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, {
            cases: {
              '@operators': 'delimiter',
              '@default': ''
            }
          }],

          // numbers
          [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
          [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
          [/0[xX](@hexdigits)/, 'number.hex'],
          [/0[oO]?(@octaldigits)/, 'number.octal'],
          [/0[bB](@binarydigits)/, 'number.binary'],
          [/(@digits)/, 'number'],

          // delimiter: after number because of .\d floats
          [/[;,.]/, 'delimiter'],

          // strings
          [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
          [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
          [/"/, 'string', '@string_double'],
          [/'/, 'string', '@string_single'],
          [/`/, 'string', '@string_backtick'],
        ],

        whitespace: [
          [/[ \t\r\n]+/, ''],
          [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
          [/\/\*/, 'comment', '@comment'],
          [/\/\/.*$/, 'comment'],
        ],

        comment: [
          [/[^\/*]+/, 'comment'],
          [/\*\//, 'comment', '@pop'],
          [/[\/*]/, 'comment']
        ],

        jsdoc: [
          [/[^\/*]+/, 'comment.doc'],
          [/\*\//, 'comment.doc', '@pop'],
          [/[\/*]/, 'comment.doc']
        ],

        // We match regular expression quite precisely
        regexp: [
          [/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']],
          [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]],
          [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
          [/[()]/, 'regexp.escape.control'],
          [/@regexpctl/, 'regexp.escape.control'],
          [/[^\\\/]/, 'regexp'],
          [/@regexpesc/, 'regexp.escape'],
          [/\\\./, 'regexp.invalid'],
          [/(\/)([gimsuy]*)/, [{ token: 'regexp', bracket: '@close', next: '@pop' }, 'keyword.other']],
        ],

        regexrange: [
          [/-/, 'regexp.escape.control'],
          [/\^/, 'regexp.invalid'],
          [/@regexpesc/, 'regexp.escape'],
          [/[^\]]/, 'regexp'],
          [/\]/, { token: 'regexp.escape.control', next: '@pop', bracket: '@close' }],
        ],

        string_double: [
          [/[^\\"]+/, 'string'],
          [/@escapes/, 'string.escape'],
          [/\\./, 'string.escape.invalid'],
          [/"/, 'string', '@pop']
        ],

        string_single: [
          [/[^\\']+/, 'string'],
          [/@escapes/, 'string.escape'],
          [/\\./, 'string.escape.invalid'],
          [/'/, 'string', '@pop']
        ],

        string_backtick: [
          [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
          [/[^\\`$]+/, 'string'],
          [/@escapes/, 'string.escape'],
          [/\\./, 'string.escape.invalid'],
          [/`/, 'string', '@pop']
        ],

        bracketCounting: [
          [/\{/, 'delimiter.bracket', '@bracketCounting'],
          [/\}/, 'delimiter.bracket', '@pop'],
          { include: 'common' }
        ],
      },
    } as any);

    return monaco.languages.registerCompletionItemProvider(lang, {
      triggerCharacters: ['.', ' '],
      provideCompletionItems: function (model, position) {
        let textUntilPosition = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });

        let word = model.getWordUntilPosition(position);
        let range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        if (!textUntilPosition.endsWith(' ')) {
          try {
            if (textUntilPosition.endsWith(' ') || textUntilPosition.endsWith('.')) {
              const arr = textUntilPosition.split('.');
              if (arr[arr.length - 1] != '') {
                const arr2 = arr[arr.length - 1].split(' ');
                if (arr2[arr2.length - 2] != '') {
                  return {
                    suggestions: suggestGenenrator(range, arr2[arr2.length - 2], data)
                  };
                }
              } else {
                const arr = textUntilPosition.split('.');
                if (arr[arr.length - 2] != '') {
                  const arr2 = arr[arr.length - 2].split(' ');
                  if (arr2[arr2.length - 1] != '') {
                    return {
                      suggestions: suggestGenenrator(range, arr2[arr2.length - 1], data)
                    };
                  }
                }
              }
            }
          } catch {

            console.log('có lỗi');
            return {
              suggestions: suggestGenenrator(range, '', data)
            };
          }
        } else {
          return {
            suggestions: suggestGenenrator(range, '', data)
          };
        }
      }
    });
  }

}
