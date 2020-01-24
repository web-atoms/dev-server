export default interface IFilePath {

    name: string;
    base: string;
    dir: string;
    ext: string;
    root: string;
    url: string;
    urlDesignMode: string;
    urlPacked: string;
    urlDesignModePacked: string;
    visible: boolean;
    packed?: boolean;
    module?: string;

}
