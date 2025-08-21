import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function NewsIndex({ news }) {
    const [selectedNews, setSelectedNews] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, item: null });
    const [processing, setProcessing] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            draft: { color: 'bg-gray-100 text-gray-800', label: '下書き' },
            published: { color: 'bg-green-100 text-green-800', label: '公開中' },
            hidden: { color: 'bg-red-100 text-red-800', label: '非公開' }
        };

        const config = statusConfig[status] || statusConfig.draft;

        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
                {config.label}
            </span>
        );
    };

    // 削除処理
    const handleDelete = () => {
        if (!deleteModal.item) return;

        setProcessing(true);
        router.delete(route('admin.news.destroy', deleteModal.item.id), {
            onSuccess: () => {
                setDeleteModal({ show: false, item: null });
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
                alert('削除に失敗しました。');
            }
        });
    };

    // ステータス切り替え処理
    const toggleStatus = (item) => {
        const newStatus = item.status === 'published' ? 'hidden' : 'published';
        const confirmMessage = item.status === 'published'
            ? 'このお知らせを非公開にしますか？'
            : 'このお知らせを公開しますか？';

        if (!confirm(confirmMessage)) return;

        setProcessing(true);
        router.patch(route('admin.news.toggle-status', item.id), {}, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
                alert('ステータスの変更に失敗しました。');
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        お知らせ管理
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('admin.news.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                        >
                            新規作成
                        </Link>
                        <Link
                            href={route('dashboard')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                        >
                            ダッシュボードに戻る
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="お知らせ管理" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {!selectedNews ? (
                        // 一覧表示
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        お知らせ一覧 ({news.length}件)
                                    </h3>
                                </div>

                                {news.length === 0 ? (
                                    <div className="text-center py-12">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">お知らせがありません</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            最初のお知らせを作成してください。
                                        </p>
                                        <div className="mt-6">
                                            <Link
                                                href={route('admin.news.create')}
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                お知らせを作成
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        タイトル
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        ステータス
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        公開日
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        作成日時
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        操作
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {news.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {item.title}
                                                                        {item.is_important && (
                                                                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                                重要
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500 mt-1">
                                                                        {item.excerpt || (item.content.length > 50
                                                                            ? `${item.content.substring(0, 50)}...`
                                                                            : item.content)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {getStatusBadge(item.status)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.published_at ? formatDate(item.published_at) : '-'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {formatDate(item.created_at)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex flex-col space-y-1">
                                                                <div className="flex space-x-1">
                                                                    <button
                                                                        onClick={() => setSelectedNews(item)}
                                                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-2 py-1 rounded text-xs transition-colors"
                                                                    >
                                                                        詳細
                                                                    </button>
                                                                    <Link
                                                                        href={route('admin.news.edit', item.id)}
                                                                        className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 px-2 py-1 rounded text-xs transition-colors"
                                                                    >
                                                                        編集
                                                                    </Link>
                                                                </div>
                                                                <div className="flex space-x-1">
                                                                    <button
                                                                        onClick={() => toggleStatus(item)}
                                                                        disabled={processing}
                                                                        className={`px-2 py-1 rounded text-xs transition-colors ${
                                                                            item.status === 'published'
                                                                                ? 'text-orange-600 hover:text-orange-900 bg-orange-100 hover:bg-orange-200'
                                                                                : 'text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200'
                                                                        }`}
                                                                    >
                                                                        {item.status === 'published' ? '非公開' : '公開'}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setDeleteModal({ show: true, item })}
                                                                        disabled={processing}
                                                                        className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-2 py-1 rounded text-xs transition-colors"
                                                                    >
                                                                        削除
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        // 詳細表示
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        お知らせ詳細
                                    </h3>
                                    <button
                                        onClick={() => setSelectedNews(null)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                                    >
                                        一覧に戻る
                                    </button>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                タイトル
                                            </label>
                                            <p className="text-sm text-gray-900 bg-white p-2 rounded border">
                                                {selectedNews.title}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                ステータス
                                            </label>
                                            <div className="bg-white p-2 rounded border">
                                                {getStatusBadge(selectedNews.status)}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                公開日
                                            </label>
                                            <p className="text-sm text-gray-900 bg-white p-2 rounded border">
                                                {selectedNews.published_at ? formatDate(selectedNews.published_at) : '未設定'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                作成日時
                                            </label>
                                            <p className="text-sm text-gray-900 bg-white p-2 rounded border">
                                                {formatDate(selectedNews.created_at)}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            本文
                                        </label>
                                        <div className="bg-white p-4 rounded border min-h-[200px]">
                                            <pre className="whitespace-pre-wrap text-sm text-gray-900 font-sans">
                                                {selectedNews.content}
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <Link
                                            href={route('admin.news.edit', selectedNews.id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                                        >
                                            編集
                                        </Link>
                                        <button
                                            onClick={() => toggleStatus(selectedNews)}
                                            disabled={processing}
                                            className={`font-bold py-2 px-4 rounded text-sm ${
                                                selectedNews.status === 'published'
                                                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                        >
                                            {selectedNews.status === 'published' ? '非公開にする' : '公開する'}
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal({ show: true, item: selectedNews })}
                                            disabled={processing}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 削除確認モーダル */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mt-2">削除確認</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    「{deleteModal.item?.title}」を削除しますか？
                                </p>
                                <p className="text-sm text-red-600 mt-1">
                                    この操作は取り消せません。
                                </p>
                            </div>
                            <div className="flex justify-center space-x-4 px-4 py-3">
                                <button
                                    onClick={() => setDeleteModal({ show: false, item: null })}
                                    disabled={processing}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={processing}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
                                >
                                    {processing ? '削除中...' : '削除する'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
