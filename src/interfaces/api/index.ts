export default interface IApiResponse<T, V> {
    success: boolean
    message: T
    value: V
}
