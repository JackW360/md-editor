import showdown from 'showdown';

export function converter(){
    return new showdown.Converter();
}
