import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ news }) {
const { data, setData, put, processing, errors } = useForm({
    title: news.title,
    content: news.content,
    status: news.status || 'draft',
});

const submit = (e) => {
    e.preventDefault();
    put(route('admin.news.update', news.id));
};

return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            お知らせ編集
          </h2>
          <Link
            href={route('admin.news.index')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            一覧に戻る
          </Link>
        </div>
      }
    >
      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">お知らせ編集</h3>

              <form onSubmit={submit} className="space-y-6">
                {/* タイトル */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="お知らせのタイトルを入力してください"
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* 本文 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    本文 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="8"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder="お知らせの内容を入力してください"
                  />
                  {errors.content && (
                    <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                  )}
                </div>

                {/* ステータス */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                    <option value="hidden">非公開</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-600 text-sm mt-1">{errors.status}</p>
                  )}
                </div>

                {/* ボタン */}
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                  >
                    {processing ? '更新中...' : '更新する'}
                  </button>

                  <Link
                    href={route('admin.news.index')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                  >
                    キャンセル
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
