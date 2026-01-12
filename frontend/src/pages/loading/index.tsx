export default function Loading() {
    return (
        <>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <div className="h-10 w-10 border-[5px] border-t-[var(--color-end)] border-[rgb(215,195,195)] rounded-full animate-spin relative"></div>
                <div className="mt-5 text-[16px] text-[var(--color-end)]">Loading...</div>
            </div>
        </>
    );
}
