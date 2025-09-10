export default function RoomsListSkeleton() {
    return (
        <div className="flex z-30 flex-col py-2 px-4 h-full w-full border-r rounded-tl-lg animate-pulse bg-neutral-900/80">
            <div className="flex items-center justify-between mb-2">
                <div className="h-6 w-32 bg-neutral-700 rounded" />
                <div className="h-8 w-8 bg-neutral-700 rounded-full" />
            </div>
            <div className="flex my-2 w-full gap-2">
                <div className="w-11/12 rounded-s-md bg-neutral-800 p-2 h-8" />
                <div className="bg-neutral-800 w-1/12 rounded-e-md flex justify-center items-center px-2 h-8" />
            </div>
            <div className="overflow-y-auto w-full h-8/10 mt-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full px-4 pt-1 pb-2 my-1 animate-pulse transition duration-300 rounded-lg cursor-pointer">
                        <div className="flex gap-2 items-center">
                            <div className="border border-gray-600 rounded-full min-w-8 min-h-8 bg-neutral-700" />
                            <div className="w-full">
                                <div className="flex justify-between w-full items-center mb-1">
                                    <div className="h-4 w-24 bg-neutral-700 rounded" />
                                    <div className="h-4 w-10 bg-neutral-700 rounded" />
                                </div>
                                <div className="flex justify-between w-full items-center gap-2">
                                    <div className="h-3 w-32 bg-neutral-800 rounded" />
                                    <div className="h-4 w-6 bg-blue-600 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}