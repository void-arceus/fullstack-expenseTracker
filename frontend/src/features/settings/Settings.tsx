import PreferenceSettings from "./PreferenceSettings";
import ProfileSettings from "./ProfileSettings";

function Settings() {
    return (
        <div className="pt-18 h-screen w-full flex flex-col gap-2 px-6">
            <div className="py-3">
                <h1 className="text-xl font-bold text-(--text-primary)">
                    Settings
                </h1>
                <p className="text-xs font-semibold text-(--text-secondary)">
                    Manage your accound and preferences
                </p>
            </div>
            <div>
                <ProfileSettings />
                <PreferenceSettings />
            </div>
        </div>
    );
}

export default Settings;
