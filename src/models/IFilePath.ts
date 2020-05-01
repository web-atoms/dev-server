export default interface IFilePath {

    name: string;
    base: string;
    dir: string;
    ext: string;
    root: string;
    url: string;
    hostUrl?: string;
    package?: string;
    visible: boolean;
    packed?: boolean;
    module?: string;

}
