import { loremIpsum } from "lorem-ipsum";
import { useState } from "react";

function TagsSection() {
    const testArr: any[] = [...Array(15).keys()].map(() =>
        loremIpsum({ count: 1, units: "word" }),
    );
    const testArr2: string[] = ["كلية", "معهد", "انتساب موجه"];
    return (
        <div id="tags-section" className="panel flex flex-col">
            <span>المجال:</span>
            <div className="inline">
                {testArr.map((v, i) => (
                    <Tag key={i}>{v}</Tag>
                ))}
            </div>
            <span>النوع:</span>
            <div className="inline">
                {testArr2.map((v, i) => (
                    <Tag key={i}>{v}</Tag>
                ))}
            </div>
        </div>
    );
}

function Tag({ ...props }) {
    const [checked, setChecked] = useState(false);

    return (
        <button
            className={"button m-0.5 px-2" + (checked ? " checked-tag" : "")}
            onClick={() => setChecked(!checked)}>
            {props.children}
        </button>
    );
}

export default TagsSection;
