type User = {
    id: string;
    email: string;
};

type UserContext = {
    user: User | null;
    setUser: (user: User | null) => void;
};
