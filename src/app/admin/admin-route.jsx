const ProtectedRoute = () => {
    const user = useUserStore((state) => state.user);
    if (user) {
        // continue
    } else {
        // return to login
    }

}

export default ProtectedRoute;