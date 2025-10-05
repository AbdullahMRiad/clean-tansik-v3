import { useContext } from "react";
import { AppContext } from "../../App";

function TagsSection() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("ContextError: Context passed to DataSelector is null");
    const { tags, setTags, types, setTypes } = ctx;

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

    const typesArr: string[] = ["جامعة", "معهد", "انتساب"];
    return (
        <div id="tags-section" className="panel flex flex-col">
            <span>المجال:</span>
            <div className="inline-flex flex-wrap gap-1.5">
                {Object.keys(majors).map((v, i) => (
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
                        checked={tags.includes(v)}></Tag>
                ))}
            </div>
            <span className="mt-2">النوع:</span>
            <div className="inline-flex flex-wrap gap-1.5">
                {typesArr.map((v, i) => (
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
                        checked={types.includes(v)}></Tag>
                ))}
            </div>
        </div>
    );
}

function Tag({
    text,
    icon,
    handleClick,
    checked,
}: {
    text: string;
    icon?: string;
    handleClick: () => void;
    checked: boolean;
}) {
    return (
        <button
            className={
                "button my-0.5 flex flex-row items-center px-2 py-1" +
                (checked ? " checked-tag" : "")
            }
            onClick={() => {
                handleClick();
            }}>
            <i className={icon ? "material-symbols-outlined ml-1" : "hidden"}>
                {icon}
            </i>
            {text}
        </button>
    );
}

export default TagsSection;
