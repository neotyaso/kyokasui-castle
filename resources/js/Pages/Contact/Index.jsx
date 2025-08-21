import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function ContactIndex() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    message: '',
  });

  // 送信時の動き
  function submit(e) {
    e.preventDefault();
    post('/contact');
  }

  return (
    <AppLayout>
      <div className="bg-[url('/images/Contact/meyasu.png')] bg-cover bg-center h-[23vh] md:h-[30vh] lg:h-[45vh] xl:h-[55vh]">
        <h1 className="font-yuji text-center text-black pt-[6.5vh] md:pt-[11vh] lg:pt-[15vh] xl:pt-[17vh] text-4xl md:text-6xl lg:text-8xl xl:text-9xl">お問い合わせ</h1>
      </div>

      <form onSubmit={submit} className="space-y-5 mt-[8vh] mx-[4vw]">
        {/* お名前 */}
        <div>
          <label htmlFor="name" className="block mb-[0.7vh] text-lg lg:text-xl xl:text-2xl font-bold font-yuji">お名前</label>
          <input
            id="name"
            type="text"
            className="w-full border"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="例：鏡花 桜"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* メール */}
        <div>
          <label htmlFor="email" className="block mb-[0.7vh] text-lg lg:text-xl xl:text-2xl font-bold font-yuji">メールアドレス</label>
          <input
            id="email"
            type="email"
            className="w-full border"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder='例：example@kyoka.com'
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* 本文 */}
        <div>
          <label htmlFor="message" className="block mb-[0.7vh] text-lg lg:text-xl xl:text-2xl font-bold font-yuji">お問い合わせ内容</label>
          <textarea
            id="message"
            className="w-full border  h-[18vh] lg:h-[20vh] xl:h-[25vh]"
            value={data.message}
            onChange={(e) => setData('message', e.target.value)}
          />
          {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
        </div>

        {/* 送信ボタン */}
        <div className="flex justify-center">
            <button
                type="submit"
                className="bg-black text-white px-[35vw] md:px-[40vw] py-[1.3vh] disabled:opacity-50 lg:text-lg xl:text-xl mt-[1vh] mb-[4vh] md:mb-[6vh] font-yuji"
                disabled={processing}
            >
                {processing ? '送信中...' : '送信'}
            </button>
        </div>
      </form>

    </AppLayout>
  );
}
