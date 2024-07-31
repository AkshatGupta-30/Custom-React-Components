interface IPage {
    name: string,
    path: string,
    subPages?: IPage[]
}

export default IPage