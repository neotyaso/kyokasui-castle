import { Link } from '@inertiajs/react';

export default function Thanks() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl  font-bold mb-2 font-yuji">送信ありがとうございました。</h1>
      <p className="mb-6 font-yuji md:text-xl lg:text-2xl">担当者より追ってご連絡いたします。</p>
      <Link href="/" className="inline-block bg-black text-white px-4 py-2 font-yuji md:text-xl lg:text-2xl">
        トップへ戻る
      </Link>
    </div>
  );
}
