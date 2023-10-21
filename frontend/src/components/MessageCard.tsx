import Image from 'next/image';
import placeholderImg from '../assets/userPlaceholder.png';

export default function MessageCard() {
  return (
    <div className="flex gap-7">
      <Image
        src={placeholderImg}
        alt="imagePlaceholder"
        className="max-w-[42px] max-h-[42px]"
      />
      <div className="flex flex-col">
        <div className="flex gap-4  text-[#828282] items-center">
          <strong className="text-[18px] tracking-[-0.63px]">Name</strong>
          <span className="tracking-[-0.49px] text-[14px]">
            yesterday at 2:29pm
          </span>
        </div>

        <p>
          Morbi eget turpis ut massa luctus cursus. Sed sit amet risus quis
          neque condimentum aliquet. Phasellus consequat et justo eu accumsan
          🙌. Proin pretium id nunc eu molestie. Nam consectetur, ligula vel
          mattis facilisis, ex mauris venenatis nulla, eget tempor enim neque
          eget massa 🤣
        </p>
      </div>
    </div>
  );
}
