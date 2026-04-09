import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => (
    <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-40" />
        <div className="grid md:grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
        </div>
    </div>
);

export default LoadingState;