﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace JwtWork.SQLDB.Models;

public partial class UserTB
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string UserId { get; set; }

    [Required]
    [StringLength(50)]
    public string Post { get; set; }

    [StringLength(200)]
    public string Email { get; set; }

    [StringLength(200)]
    public string UserName { get; set; }

    [StringLength(250)]
    public string EncPassword { get; set; }

    public bool Disabled { get; set; }

    public int UserLevel { get; set; }

    [StringLength(50)]
    public string LevelType { get; set; }

    public bool BeAdmin { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime LoginAt { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime UpdatedAt { get; set; }

    [Required]
    [StringLength(50)]
    public string UpdatedBy { get; set; }
}