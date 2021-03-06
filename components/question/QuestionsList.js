import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { friendlyTimeWithLineBreak, truncate } from '../../filters'

@Radium
export default class QuestionsList extends React.Component {
    static defaultProps = {
        showQuestionUser: true
    }

    static propTypes = {
        questions: React.PropTypes.array.isRequired,
        openUpdateQuestionModal: React.PropTypes.func.isRequired,
        openQuestionDetailsModal: React.PropTypes.func.isRequired,
        showQuestionUser: React.PropTypes.bool,
        deleteQuestion: React.PropTypes.func.isRequired
    }

    render() {
        const { questions, openUpdateQuestionModal, openQuestionDetailsModal, deleteQuestion } = this.props
        const rows = questions.map(question => {
            const asker = question.get('asker')
            const user = question.get('user')

            return (
                <tr key={question.id}>
                    <td style={styles.titleCell}>
                        <strong>
                            {asker ? (<Link to={`/user/${asker.id}`}>{asker.get('name')}</Link>) : "游客"}
                        </strong>
                        ：
                        {question.get('title')}
                    </td>
                    <td>{question.get('anonymous') ? <i className="fa fa-check"/> : null}</td>
                    {this.props.showQuestionUser ?
                        (<td><Link to={`/user/${user.id}`}>{user.get('name')}</Link></td>) : null}
                    <td style={styles.answerCell}>
                        {truncate(question.get('answer'), 60)}
                    </td>
                    <td>{question.get('commentsCount')}</td>
                    <td>{question.get('likesCount')}</td>
                    <td>{friendlyTimeWithLineBreak(question.createdAt)}</td>
                    <td>{friendlyTimeWithLineBreak(question.get('answeredAt'))}</td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <button type="button" className="btn btn-default"
                                    onClick={() => openUpdateQuestionModal(question)}>编辑
                            </button>
                            <button type="button" className="btn btn-default"
                                    onClick={() => deleteQuestion(question)}>
                                删除
                            </button>
                            <button type="button" className="btn btn-default"
                                    onClick={()=>openQuestionDetailsModal(question)}>详情
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>问题</th>
                    <th>匿名</th>
                    {this.props.showQuestionUser ? <th>被提问者</th> : null}
                    <th>回答</th>
                    <th>回复</th>
                    <th>点赞</th>
                    <th>提问于</th>
                    <th>回答于</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

const styles = {
    titleCell: {
        maxWidth: '200px'
    },
    answerCell: {
        maxWidth: '200px'
    }
}
