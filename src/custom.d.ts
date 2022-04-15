declare module "*.svg";
declare module "*.png" {
    const content: any;
    export default content;
}