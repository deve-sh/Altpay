import create from "zustand";

const useUserAuth = create((set) => ({
	user: null,
	setUser: (updatedUser) => set(() => ({ user: updatedUser })),
}));

export default useUserAuth;
