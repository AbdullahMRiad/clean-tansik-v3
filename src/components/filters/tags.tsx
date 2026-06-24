import { useContext, useState } from "react";
import { AppContext } from "../../App";

function TagsSection() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to DataSelector is null");
    const { tags, setTags, types, setTypes, availableTags, availableTypes } =
        ctx;

    const [isMajorsOpen, setIsMajorsOpen] = useState<boolean>(false);
    const [isTypesOpen, setIsTypesOpen] = useState<boolean>(false);

    const majors: { [key: string]: string } = {
        طب: "ecg",
        "طب أسنان": "dentistry",
        "طب بيطري": "pet_supplies",
        صيدلة: "syringe",
        "علاج طبيعي": "accessibility_new",
        تمريض: "admin_meds",
        هندسة: "engineering",
        "هندسة بترول": "oil_barrel",
        "تخطيط عمراني": "location_city",
        "الملاحة والفضاء": "rocket_launch",
        تكنولوجيا: "manufacturing",
        "حاسبات ومعلومات": "data_object",
        "اقتصاد وعلوم سياسية": "finance_mode",
        "علوم سياسية": "gavel",
        "علوم بيئية": "nature_people",
        علوم: "science",
        رياضيات: "calculate",
        إحصاء: "bar_chart_4_bars",
        "مالية ومحاسبة": "payments",
        تجارة: "store",
        "إدارة أعمال": "business_center",
        إدارة: "manage_accounts",
        اقتصاد: "query_stats",
        تسويق: "campaign",
        إعلام: "video_camera_front",
        ألسن: "translate",
        آداب: "book_2",
        تربية: "co_present",
        حقوق: "balance",
        "دراسات إسلامية": "prayer_times",
        آثار: "museum",
        "سياحة وفنادق": "hotel",
        "فنون تطبيقية": "brush",
        "فنون جميلة": "palette",
        "فنون مسرحية": "theater_comedy",
        زراعة: "agriculture",
        "خدمة اجتماعية": "volunteer_activism",
        صناعة: "factory",
        "الإعاقة والتأهيل": "accessible_forward",
        "غير مصنف": "block",
    };

    // const typesArr: string[] = ["جامعة", "معهد", "انتساب"];
    return (
        <div id="tags-section" className="panel flex flex-col gap-1">
            <details className="[interpolate-size:allow-keywords] details-content:h-0 details-content:overflow-clip details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 open:details-content:h-auto">
                <summary
                    className="button flex flex-row gap-1 px-2 py-1"
                    onClick={() => setIsMajorsOpen(!isMajorsOpen)}>
                    <span>المجال</span>
                    <i
                        className={`material-symbols-outlined transition-transform duration-200 ease-in-out ${isMajorsOpen ? "rotate-0" : "rotate-90"}`}>
                        arrow_drop_down
                    </i>
                </summary>
                <div className="mt-1 grid grid-cols-2 gap-1">
                    {availableTags.map((v, i) => (
                        <Tag
                            key={i}
                            text={v}
                            icon={majors[v]}
                            handleClick={() => {
                                if (tags.includes(v)) {
                                    setTags(tags.filter((t) => t !== v));
                                } else {
                                    setTags([...tags, v]);
                                }
                            }}
                            checked={tags.includes(v)}
                            centered={false}></Tag>
                    ))}
                </div>
            </details>
            <details className="[interpolate-size:allow-keywords] details-content:h-0 details-content:overflow-clip details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 open:details-content:h-auto">
                <summary
                    className="button flex flex-row gap-1 px-2 py-1"
                    onClick={() => setIsTypesOpen(!isTypesOpen)}>
                    <span>النوع</span>
                    <i
                        className={`material-symbols-outlined transition-transform duration-200 ease-in-out ${isTypesOpen ? "rotate-0" : "rotate-90"}`}>
                        arrow_drop_down
                    </i>
                </summary>
                <div className="mt-1 grid grid-cols-3 gap-1">
                    {availableTypes.map((v, i) => (
                        <Tag
                            key={i}
                            text={v}
                            handleClick={() => {
                                if (types.includes(v)) {
                                    setTypes(types.filter((t) => t !== v));
                                } else {
                                    setTypes([...types, v]);
                                }
                            }}
                            checked={types.includes(v)}
                            centered={true}></Tag>
                    ))}
                </div>
            </details>
        </div>
    );
}

function Tag({
    text,
    icon,
    handleClick,
    checked,
    centered,
}: {
    text: string;
    icon?: string;
    handleClick: () => void;
    checked: boolean;
    centered: boolean;
}) {
    return (
        <button
            className={
                "button flex flex-row items-center gap-1 px-2 py-1" +
                (checked ? " checked-tag" : "")
            }
            onClick={() => {
                handleClick();
            }}>
            <i
                className={
                    icon
                        ? "material-symbols-outlined max-[350px]:hidden!"
                        : "hidden"
                }>
                {icon}
            </i>
            <span className={centered ? "mx-auto" : ""}>{text}</span>
        </button>
    );
}

export default TagsSection;
