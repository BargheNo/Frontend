import hasPermission from "./hasPermission";

const adminPermissions = [
	"general.all",
	"user.view_all",
	"user.ban_unban",
	"user.change_role",
	"user.view_roles",
	"user.manage_role_permissions",
	"user.remove_role",
	"user.create_role",
	"corporation.view_all",
	"corporation.approve_decline",
	"installation_request.view_all",
	"installation_request.edit",
	"installation_request.remove",
	"ticket.view_all",
	"ticket.respond",
	"ticket.close",
	"ticket.comment",
	"report.view_all",
	"report.respond",
	"admin_blog.view_all",
	"admin_blog.create",
	"admin_blog.edit",
	"admin_blog.delete",
	"news.view_all",
	"news.create",
	"news.edit",
	"news.delete",
	"panel.view_all",
	"panel.create",
];

export default function hasAdminAnyPermission() {
	return adminPermissions
		.map((adminPermission) => hasPermission(adminPermission))
		.some((value) => value === true);
}
