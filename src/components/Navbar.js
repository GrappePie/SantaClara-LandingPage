import {useRouter} from "next/router";
import {useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setHidden} from "@/Hooks/HiddenSlice";
import NavbarMU from "@/components/NavbarMU";

const Navbar = () => {
    const hidden = useSelector((state) => state.hidden);
    const dispatch = useDispatch();
    const router = useRouter();
    const myRef = useRef(null);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/profile");
            const profile = await response.json();
            if (profile.role === "admin") {
                dispatch(setHidden(false));
            } else {
                dispatch(setHidden(true));
                router.route.slice(0, 7) === "/admin/" && router.push("/");
            }
        }

        fetchData();
    }, [dispatch, router]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/logout");
            const data = await response.json();
            console.log(data);
            dispatch(setHidden(true));
            router.push("/");
        } catch (error) {
            dispatch(setHidden(true));
            router.push("/");
        }
    };
    return (
        <NavbarMU myRef={myRef} hidden={hidden} handleLogout={handleLogout}/>
    );
};

export default Navbar;
