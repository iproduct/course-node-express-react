function f() {
    return { x: 10, y: 3 };
}

type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

type P = MyReturnType<typeof f>;


// conditional typing
interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}

// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "unimplemented";
// }

type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
    throw "unimplemented";
}

const a = createLabel("typescript");

const b = createLabel(2.8);

const c = createLabel(Math.random() ? "hello" : 42);

// extends constraint
// type MessageOf<T extends { message: unknown }> = T["message"];
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Sms {
    message: string;
}

type SmsMessageContents = MessageOf<Sms>;

interface Email {
    message: string[];
}

type EmailMessageContents = MessageOf<Email>;

type DateMessageContents = MessageOf<Date>;


// array
type Flatten<T> = T extends any[] ? T[number] : T;
 
// Extracts out the element type.
type Str = Flatten<string[]>;
 
// Leaves the type alone.
type Num = Flatten<number>;
type PostType = Flatten<Post[]>;
