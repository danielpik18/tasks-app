import CreateTask from "@/components/CreateTask/CreateTask";
import TasksList from "@/components/TasksList/TasksList";

export default function Tasks() {
    return (
        <main className="w-full pb-8">
            <div className="flex flex-col items-center gap-4">
                <CreateTask />
                <TasksList />
            </div>
        </main>
    );
}
