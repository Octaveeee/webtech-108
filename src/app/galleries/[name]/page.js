'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { CiTrash } from 'react-icons/ci'

export default function GalleryDetail() {
  const params = useParams()
  const router = useRouter()
  const nameParam = params.name
  const galleryName = decodeURIComponent(nameParam).replaceAll('-', ' ')
  // gallery and user state
  const [gallery, setGallery] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [userLoading, setUserLoading] = useState(true)
  // comments state
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentContent, setCommentContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [commentError, setCommentError] = useState(null)
  const [deletingCommentId, setDeletingCommentId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingGallery, setDeletingGallery] = useState(false)
  const [updatingFinished, setUpdatingFinished] = useState(false)

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from('galleries').select(`*,profiles!galleries_id_user_fkey(name)`).eq('name', galleryName).single()

        if (error) throw error
        setGallery(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (galleryName) {
      fetchGallery()
    }
  }, [galleryName])

  // get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        // get user profile
        const { data } = await supabase.from('profiles').select('name').eq('user_id', user.id).single()
        setProfile(data)
      }
      setUserLoading(false)
    }

    getUser()

    // auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase.from('profiles').select('name').eq('user_id', session.user.id).single().then(({ data }) => setProfile(data))
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // get comments
  const fetchCommentsWithProfiles = async (galleryId) => {
    const { data: commentsData, error: commentsError } = await supabase.from('comments').select('*').eq('gallery_id', galleryId).order('created_at', { ascending: false })

    if (commentsError) throw commentsError
    if (!commentsData?.length) return []

    const userIds = [...new Set(commentsData.map(c => c.user_id))]
    const { data: profilesData, error: profilesError } = await supabase.from('profiles').select('user_id, name').in('user_id', userIds)

    if (profilesError) throw profilesError

    return commentsData.map(comment => ({...comment,profiles: profilesData?.find(p => p.user_id === comment.user_id) || null
    }))
  }

  useEffect(() => {
    if (!gallery?.id_galleries) return

    const fetchComments = async () => {
      try {
        setCommentsLoading(true)
        const comments = await fetchCommentsWithProfiles(gallery.id_galleries)
        setComments(comments)
      } catch {
        setComments([])
      } finally {
        setCommentsLoading(false)
      }
    }

    fetchComments()
  }, [gallery])

  // new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!user || !gallery || !commentContent.trim()) return

    setSubmitting(true)
    setCommentError(null)

    try {
      // insert comment
      const { error } = await supabase.from('comments').insert({user_id: user.id, gallery_id: gallery.id_galleries, content: commentContent.trim()}).select()

      if (error) throw error

      setCommentContent('')
      const comments = await fetchCommentsWithProfiles(gallery.id_galleries)
      setComments(comments)
    } catch (err) {
      setCommentError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // delete comment
  const handleDeleteComment = async (commentId) => {
    if (!user || !gallery) return

    setDeletingCommentId(commentId)
    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId).eq('user_id', user.id)

      if (error) throw error

      // refresh comments
      const comments = await fetchCommentsWithProfiles(gallery.id_galleries)
      setComments(comments)
    } catch {
      // silent fail
    } finally {
      setDeletingCommentId(null)
    }
  }

  // delete gallery
  const handleDeleteGallery = async () => {
    if (!user || !gallery || !user.id || gallery.id_user !== user.id) return

    setDeletingGallery(true)
    try {
      const { error } = await supabase.from('galleries').delete().eq('id_galleries', gallery.id_galleries).eq('id_user', user.id).select()

      if (error) throw error

      // redirect to galleries list
      router.push('/galleries')
    } catch {
      setDeletingGallery(false)
      setShowDeleteConfirm(false)
    }
  }

  // finished status
  const handleToggleFinished = async () => {
    if (!user || !gallery || !user.id || gallery.id_user !== user.id) return

    setUpdatingFinished(true)
    try {
      const { error } = await supabase.from('galleries').update({ finished: !gallery.finished }).eq('id_galleries', gallery.id_galleries).eq('id_user', user.id).select()

      if (error) throw error

      // update state
      setGallery({ ...gallery, finished: !gallery.finished })
    } catch (err) {
      console.error('Error updating gallery:', err)
    } finally {
      setUpdatingFinished(false)
    }
  }

  const galleryNameForUrl = galleryName.replaceAll(' ', '-')

  return (
    <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/galleries" className="text-gray-400 hover:text-white mb-6 inline-block">
            ← Back to Galleries
          </Link>

          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">Loading gallery...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">Gallery not found.</p>
            </div>
          )}

          {!loading && !error && gallery && (
            <div className="bg-white dark:bg-[#24252a] rounded-2xl p-8 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {gallery.name}
                  </h1>
                  {!gallery.finished && (
                    <span className="text-sm text-orange-500 dark:text-orange-400 font-medium">
                      (in development)
                    </span>
                  )}
                </div>
                {user && gallery.id_user === user.id && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleToggleFinished}
                      disabled={updatingFinished}
                      className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                        gallery.finished
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {updatingFinished ? (
                        'Updating...'
                      ) : gallery.finished ? (
                        'Mark as In Development'
                      ) : (
                        'Mark as Finished'
                      )}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition flex items-center gap-2"
                    >
                      <CiTrash size={20} />
                      Delete Gallery
                    </button>
                  </div>
                )}
              </div>

              {gallery.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                    {gallery.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {gallery.created_at && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created at</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(gallery.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {gallery.profiles && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created by</p>
                    <p className="text-gray-900 dark:text-white">
                      {gallery.profiles.name || 'Unknown'}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center">
                {gallery.finished ? (
                  <Link 
                    href={`/galleries/${encodeURIComponent(galleryNameForUrl)}/scene`}
                    className="inline-block rounded-lg bg-gray-800 dark:bg-gray-700 px-6 py-3 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold"
                  >
                    Visit 3D Gallery
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-block rounded-lg bg-gray-400 dark:bg-gray-600 px-6 py-3 text-white cursor-not-allowed opacity-50 font-semibold"
                  >
                    Visit 3D Gallery (Coming Soon)
                  </button>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Comments
                </h2>

                <div className="space-y-4 mb-8">
                  {commentsLoading ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>Loading comments...</p>
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 relative">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 dark:text-gray-300 font-semibold">
                              {comment.profiles?.name?.[0]?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {comment.profiles?.name || 'Unknown User'}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(comment.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                        {user && comment.user_id === user.id && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={deletingCommentId === comment.id}
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete comment"
                          >
                            <CiTrash size={20} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {userLoading ? (
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Loading...</p>
                  </div>
                ) : user && profile ? (
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      Add a Comment
                    </h3>
                    {commentError && (
                      <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm">
                        {commentError}
                      </div>
                    )}
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                      <textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Write your comment here..."
                        rows={4}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={submitting || !commentContent.trim()}
                          className="px-6 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? 'Posting...' : 'Post Comment'}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 text-center">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      You must be logged in to post a comment.
                    </p>
                    <Link
                      href="/auth?mode=login"
                      className="inline-block px-6 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold"
                    >
                      Login to Comment
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white dark:bg-[#24252a] rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Delete Gallery</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this gallery? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deletingGallery}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGallery}
                disabled={deletingGallery}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingGallery ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

