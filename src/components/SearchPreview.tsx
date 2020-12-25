type SearchPreviewProps={
    text:string;
    index:Number;
    updateText:(text:string)=>void;
}

export default function SearchPreview({text,index,updateText}:SearchPreviewProps){
    return(
        <div
            onClick={()=>updateText(text)}
            className="search-preview"
        >
            <div className="search-data">{text}</div>
        </div>
    )
}