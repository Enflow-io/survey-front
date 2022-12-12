import { RingLoader } from "react-spinners"

export const Spinner = () => {
    return <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <RingLoader size={160} color="#1677ff" cssOverride={{
            margin: "0 auto"
        }} />
    </div>

}